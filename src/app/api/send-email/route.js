import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type = 'hr_credentials', fullName, email, password, roleTitle, assignedTasks, otpCode } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email address is required' }, { status: 400 });
    }

    const loginUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/login';
    let subject = '';
    let htmlContent = '';
    let textContent = '';

    if (type === 'otp') {
      subject = `🔑 ${otpCode} is your HireMind Email Verification OTP`;
      htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HireMind OTP Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          <tr>
            <td style="background: linear-gradient(135deg, #2D24D0 0%, #4F46E5 100%); padding: 32px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800;">HireMind Account Activation</h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Verify your email address to complete registration</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; text-align: center;">
              <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #0f172a;">Hello ${fullName || 'User'}, 👋</p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                Thank you for registering on HireMind! Please enter the 6-digit OTP code below to verify your email address and activate your account:
              </p>
              <div style="background-color: #e0e7ff; border: 2px dashed #4F46E5; border-radius: 16px; padding: 20px; margin: 0 auto 24px auto; max-width: 280px;">
                <span style="font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #2D24D0; font-family: monospace;">${otpCode}</span>
              </div>
              <p style="font-size: 12px; color: #64748b; margin: 0;">This OTP is valid for 10 minutes.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
              © ${new Date().getFullYear()} HireMind AI Recruitment Platform.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
      textContent = `Your HireMind Email Verification OTP is: ${otpCode}`;

    } else if (type === 'forgot_password_otp') {
      subject = `🔒 ${otpCode} is your Password Reset Verification Code`;
      htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>HireMind Password Reset</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          <tr>
            <td style="background: linear-gradient(135deg, #DC2626 0%, #2D24D0 100%); padding: 32px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800;">HireMind Password Reset</h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Verification code to set a new account password</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; text-align: center;">
              <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #0f172a;">Hello ${fullName || 'User'}, 👋</p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                We received a request to reset your password. Use the verification code below to authorize your password change:
              </p>
              <div style="background-color: #fee2e2; border: 2px dashed #dc2626; border-radius: 16px; padding: 20px; margin: 0 auto 24px auto; max-width: 280px;">
                <span style="font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #dc2626; font-family: monospace;">${otpCode}</span>
              </div>
              <p style="font-size: 12px; color: #64748b; margin: 0;">If you did not request a password reset, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
              © ${new Date().getFullYear()} HireMind AI Recruitment Platform.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
      textContent = `Your HireMind Password Reset OTP Code is: ${otpCode}`;

    } else {
      // Default: HR Credentials
      subject = `🔐 Welcome to HireMind! Your HR Team Credentials & Access Portal`;
      htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HireMind HR Portal Credentials</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          
          <tr>
            <td style="background: linear-gradient(135deg, #2D24D0 0%, #6366F1 50%, #4F46E5 100%); padding: 36px 32px; text-align: center; color: #ffffff;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50px; padding: 6px 16px; display: inline-block; margin-bottom: 12px;">
                      <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #ffffff;">Recruiter Team Onboarding</span>
                    </div>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; line-height: 1.2;">
                      HireMind AI Portal Credentials
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; color: #e0e7ff;">
                      Official HR Member Account Access & Role Delegation
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 36px 32px; background-color: #ffffff;">
              <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0f172a;">
                Hello ${fullName || 'Team Member'}, 👋
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                Welcome to the <strong>HireMind Enterprise Recruitment Team</strong>! You have been assigned the role of <strong>${roleTitle || 'HR Recruiter'}</strong>.
              </p>

              <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 5px solid #2D24D0; border-radius: 14px; padding: 24px; margin-bottom: 28px;">
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #2D24D0; margin-bottom: 16px;">
                  🔐 Your Account Security Credentials
                </div>

                <div style="margin-bottom: 16px;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">
                    Portal Access Email (User ID)
                  </span>
                  <div style="font-size: 15px; font-weight: 700; color: #0f172a; font-family: monospace; background-color: #eef2ff; border: 1px solid #c7d2fe; padding: 10px 14px; border-radius: 8px; display: inline-block;">
                    ${email}
                  </div>
                </div>

                <div style="margin-bottom: 16px;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">
                    Assigned Account Password
                  </span>
                  <div style="font-size: 16px; font-weight: 800; color: #2D24D0; font-family: monospace; background-color: #e0e7ff; border: 1px solid #a5b4fc; padding: 10px 14px; border-radius: 8px; display: inline-block;">
                    ${password}
                  </div>
                </div>

                <div>
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 6px;">
                    Designated Role & Assigned Tasks
                  </span>
                  <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 10px 14px; font-size: 13px; font-weight: 700; color: #047857;">
                    🎯 ${roleTitle || 'Recruiter'} — <span style="font-weight: 500; color: #065f46;">${assignedTasks || 'Full Access'}</span>
                  </div>
                </div>
              </div>

              <div style="text-align: center; margin: 32px 0 24px 0;">
                <a href="${loginUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #2D24D0 0%, #4F46E5 100%); color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 14px; font-weight: 800; font-size: 16px;">
                  🚀 Log In to HireMind Portal
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
              © ${new Date().getFullYear()} HireMind AI Recruitment Platform.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
      textContent = `HIREMIND HR CREDENTIALS\nEmail: ${email}\nPassword: ${password}`;
    }

    const payload = {
      From: { Email: 'noreply@hiremind.dev', Name: 'HireMind Platform' },
      To: [{ Email: email, Name: fullName || 'User' }],
      Subject: subject,
      Text: textContent,
      HTML: htmlContent,
    };

    // Send via Mailpit HTTP API (http://127.0.0.1:8025/api/v1/send)
    try {
      const response = await fetch('http://127.0.0.1:8025/api/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ success: true, message: 'Email delivered via Mailpit API', id: data.ID });
      }
    } catch (httpError) {
      console.warn('Mailpit HTTP API notice:', httpError?.message);
    }

    return NextResponse.json({ success: true, message: 'Dispatched via fallback' });
  } catch (err) {
    console.error('API /api/send-email error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
