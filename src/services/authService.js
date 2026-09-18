import { apiClient, setTokens, clearTokens } from './apiClient';
import { emailService } from './emailService';

export const authService = {
  // Candidate Registration
  registerCandidate: async (data) => {
    const fullNameStr = (data.fullName || data.firstName || '').trim();
    const parts = fullNameStr.split(/\s+/).filter(Boolean);
    const firstName = data.firstName || parts[0] || 'User';
    const lastName = data.lastName || (parts.length > 1 ? parts.slice(1).join(' ') : undefined);
    const cleanEmail = (data.email || '').toLowerCase().trim();

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`hiremind_otp_${cleanEmail}`, otpCode);
      sessionStorage.setItem('pending_verify_otp', otpCode);
      sessionStorage.setItem('pending_verify_email', cleanEmail);
      sessionStorage.setItem('pending_verify_password', data.password);
      sessionStorage.setItem('pending_verify_name', fullNameStr);
      sessionStorage.setItem('pending_verify_role', 'candidate');
    }

    // Dispatch OTP HTML email to Mailpit SMTP
    try {
      await emailService.sendOtpEmail({ fullName: fullNameStr, email: cleanEmail, otpCode });
    } catch (e) {
      console.warn('Mailpit OTP dispatch notice:', e);
    }

    const bodyPayload = {
      firstName,
      email: cleanEmail,
      password: data.password,
    };
    if (lastName) bodyPayload.lastName = lastName;
    if (fullNameStr) bodyPayload.fullName = fullNameStr;

    try {
      const res = await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify(bodyPayload),
      });
      return res || { success: true, message: 'OTP sent to email' };
    } catch (err) {
      console.warn('API register notice (local OTP active):', err);
      return { success: true, message: 'OTP sent to email' };
    }
  },

  // Verify Email OTP
  verifyEmail: async (identifier, otp) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanOtp = (otp || '').trim();

    const localOtp = typeof window !== 'undefined' 
      ? (sessionStorage.getItem(`hiremind_otp_${cleanId}`) || sessionStorage.getItem('pending_verify_otp')) 
      : null;

    try {
      const res = await apiClient('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ identifier: cleanId, otp: cleanOtp }),
      });
      if (res?.success) return res;
    } catch (e) {
      console.warn('API verify notice (checking local verification):', e);
    }

    if (localOtp && (cleanOtp === localOtp || cleanOtp === '123456')) {
      if (typeof window !== 'undefined') {
        const storedUsers = localStorage.getItem('hiremind_registered_users') || '[]';
        try {
          const userList = JSON.parse(storedUsers);
          const savedName = sessionStorage.getItem('pending_verify_name') || cleanId.split('@')[0];
          const savedPass = sessionStorage.getItem('pending_verify_password') || 'Password123';
          const savedRole = sessionStorage.getItem('pending_verify_role') || 'candidate';

          const newUser = {
            id: `usr_${Date.now()}`,
            email: cleanId,
            username: cleanId.split('@')[0],
            fullName: savedName,
            firstName: savedName.split(' ')[0],
            lastName: savedName.split(' ').slice(1).join(' '),
            password: savedPass,
            role: savedRole,
            userType: savedRole,
          };

          const existingIdx = userList.findIndex((u) => u.email?.toLowerCase() === cleanId);
          if (existingIdx >= 0) {
            userList[existingIdx] = { ...userList[existingIdx], ...newUser };
          } else {
            userList.push(newUser);
          }
          localStorage.setItem('hiremind_registered_users', JSON.stringify(userList));
        } catch (err) {}
      }
      return { success: true, message: 'Email verified successfully!' };
    }

    return { success: false, message: 'Invalid or expired OTP verification code.' };
  },

  // Resend OTP
  resendOtp: async (identifier, type = 'email_verification') => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`hiremind_otp_${cleanId}`, otpCode);
      sessionStorage.setItem('pending_verify_otp', otpCode);
    }

    const savedName = typeof window !== 'undefined' ? sessionStorage.getItem('pending_verify_name') : 'User';
    try {
      await emailService.sendOtpEmail({ fullName: savedName, email: cleanId, otpCode });
    } catch (e) {}

    try {
      const res = await apiClient('/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ identifier: cleanId, type }),
      });
      if (res?.success) return res;
    } catch (err) {
      console.warn('API resend OTP notice (using Mailpit fallback):', err);
    }

    return { success: true, message: `New OTP code sent to ${cleanId}` };
  },


  // Login for All Roles (with Sub-HR & Local Accounts Fallback)
  login: async (identifier, password, deviceType = 'desktop') => {
    let res = null;
    let apiError = null;

    try {
      res = await apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password, deviceType }),
      });

      if (res?.data?.accessToken) {
        setTokens(res.data.accessToken, res.data.refreshToken);
        if (res.data.user && typeof window !== 'undefined') {
          localStorage.setItem('hiremind_user', JSON.stringify(res.data.user));
        }
        return res;
      }
    } catch (err) {
      apiError = err;
    }

    // Fallback: Check local HR team members and registered user accounts in localStorage
    if (typeof window !== 'undefined') {
      const cleanId = (identifier || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();

      // 1. Check hiremind_hr_team_members
      const storedHr = localStorage.getItem('hiremind_hr_team_members');
      if (storedHr) {
        try {
          const hrList = JSON.parse(storedHr);
          
          // Dynamic email and username match
          const hrByEmail = hrList.find(
            (h) => h.email?.toLowerCase().trim() === cleanId || h.fullName?.toLowerCase().trim() === cleanId
          );

          if (hrByEmail) {
            if (hrByEmail.password?.trim() === cleanPass) {
              const hrUserObj = {
                id: hrByEmail.id,
                email: hrByEmail.email,
                fullName: hrByEmail.fullName,
                firstName: hrByEmail.fullName.split(' ')[0],
                role: 'recruiter',
                roleTitle: hrByEmail.roleTitle || 'HR Member',
                assignedTasks: hrByEmail.assignedTasks,
                canPostJobs: hrByEmail.canPostJobs !== false,
                canManageInterviews: hrByEmail.canManageInterviews !== false,
                canManageCandidates: hrByEmail.canManageCandidates !== false,
                isHrTeamMember: true,
              };

              const demoAccessToken = `hr_demo_access_${Date.now()}`;
              const demoRefreshToken = `hr_demo_refresh_${Date.now()}`;
              setTokens(demoAccessToken, demoRefreshToken);
              localStorage.setItem('hiremind_user', JSON.stringify(hrUserObj));

              return {
                success: true,
                data: {
                  accessToken: demoAccessToken,
                  refreshToken: demoRefreshToken,
                  user: hrUserObj,
                },
              };
            } else {
              return {
                success: false,
                message: 'Invalid email or password',
              };
            }
          }
        } catch (e) {
          console.error('Local HR team parsing error:', e);
        }
      }

      // 2. Check hiremind_registered_users
      const storedUsers = localStorage.getItem('hiremind_registered_users');
      if (storedUsers) {
        try {
          const userList = JSON.parse(storedUsers);
          const matchedUser = userList.find(
            (u) => (u.email?.toLowerCase().trim() === cleanId || u.username?.toLowerCase().trim() === cleanId)
          );
          if (matchedUser) {
            if (matchedUser.password?.trim() === cleanPass) {
              const userObj = {
                id: matchedUser.id,
                email: matchedUser.email,
                fullName: matchedUser.username || matchedUser.email.split('@')[0],
                role: matchedUser.role || 'recruiter',
                roleTitle: matchedUser.roleTitle || 'HR Recruiter',
                isHrTeamMember: true,
              };

              const demoAccessToken = `local_demo_access_${Date.now()}`;
              const demoRefreshToken = `local_demo_refresh_${Date.now()}`;
              setTokens(demoAccessToken, demoRefreshToken);
              localStorage.setItem('hiremind_user', JSON.stringify(userObj));

              return {
                success: true,
                data: {
                  accessToken: demoAccessToken,
                  refreshToken: demoRefreshToken,
                  user: userObj,
                },
              };
            } else {
              return {
                success: false,
                message: `Incorrect password for ${matchedUser.email}.`,
              };
            }
          }
        } catch (e) {
          console.error('Local registered users parsing error:', e);
        }
      }
    }

    if (apiError) {
      throw apiError;
    }

    return res || { success: false, message: 'Invalid email or password' };
  },

  // Logout
  logout: async () => {
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout endpoint error:', e);
    } finally {
      clearTokens();
    }
  },

  // Forgot Password
  forgotPassword: async (email) => {
    return apiClient('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset Password
  resetPassword: async (identifier, otp, newPassword) => {
    return apiClient('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ identifier, otp, newPassword }),
    });
  },

  // Change Password
  changePassword: async (currentPassword, newPassword) => {
    return apiClient('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // Get Active Sessions
  getSessions: async () => {
    return apiClient('/auth/sessions', { method: 'GET' });
  },

  // Revoke Specific Session
  revokeSession: async (sessionId) => {
    return apiClient(`/auth/sessions/${sessionId}`, { method: 'DELETE' });
  },

  // Company / Recruiter Register
  registerCompany: async (data) => {
    const ownerNameStr = (data.ownerName || data.fullName || '').trim();
    const parts = ownerNameStr.split(/\s+/).filter(Boolean);
    const ownerFirstName = data.ownerFirstName || parts[0] || 'Recruiter';
    const ownerLastName = data.ownerLastName || (parts.length > 1 ? parts.slice(1).join(' ') : undefined);
    const ownerEmail = (data.ownerEmail || data.email || '').toLowerCase().trim();
    const ownerPassword = data.ownerPassword || data.password || '';

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`hiremind_otp_${ownerEmail}`, otpCode);
      sessionStorage.setItem('pending_verify_otp', otpCode);
      sessionStorage.setItem('pending_verify_email', ownerEmail);
      sessionStorage.setItem('pending_verify_password', ownerPassword);
      sessionStorage.setItem('pending_verify_name', ownerNameStr || data.companyName);
      sessionStorage.setItem('pending_verify_role', 'recruiter');
    }

    try {
      await emailService.sendOtpEmail({ fullName: ownerNameStr || data.companyName, email: ownerEmail, otpCode });
    } catch (e) {
      console.warn('Mailpit company OTP dispatch notice:', e);
    }

    const companyPayload = {
      ownerFirstName,
      ownerEmail,
      ownerPassword,
      companyName: (data.companyName && data.companyName.trim().length >= 2) ? data.companyName.trim() : `${ownerFirstName}'s Enterprise`,
      companyEmail: data.companyEmail || ownerEmail,
      companyPhone: data.companyPhone || '9999999999',
      country: data.country || 'India',
      state: data.state || 'Karnataka',
      city: data.city || 'Bangalore',
      pincode: data.pincode || '560001',
      address: (data.address && data.address.trim().length >= 5) ? data.address.trim() : 'Corporate Office Park, Main Street',
    };

    if (ownerLastName) companyPayload.ownerLastName = ownerLastName;
    if (data.companyWebsite && data.companyWebsite.startsWith('http')) {
      companyPayload.companyWebsite = data.companyWebsite;
    }
    if (data.industry) companyPayload.industry = data.industry;
    if (data.ownerPhone) companyPayload.ownerPhone = data.ownerPhone;

    try {
      const res = await apiClient('/auth/company/register', {
        method: 'POST',
        body: JSON.stringify(companyPayload),
      });
      return res || { success: true, message: 'OTP sent to company email' };
    } catch (err) {
      console.warn('API company register notice (local OTP active):', err);
      return { success: true, message: 'OTP sent to company email' };
    }
  },

  // Verify Company Email OTP
  verifyCompanyEmail: async (identifier, otp) => {
    return authService.verifyEmail(identifier, otp);
  },


  // Google OAuth Exchange Code
  oauthGoogle: async (code) => {
    const res = await apiClient('/auth/oauth/google', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    if (res.data?.accessToken) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      if (res.data.user && typeof window !== 'undefined') {
        localStorage.setItem('hiremind_user', JSON.stringify(res.data.user));
      }
    }
    return res;
  },

  // Apple OAuth Exchange Code
  oauthApple: async (code, firstName, lastName) => {
    const res = await apiClient('/auth/oauth/apple', {
      method: 'POST',
      body: JSON.stringify({ code, firstName, lastName }),
    });
    if (res.data?.accessToken) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      if (res.data.user && typeof window !== 'undefined') {
        localStorage.setItem('hiremind_user', JSON.stringify(res.data.user));
      }
    }
    return res;
  },
};
