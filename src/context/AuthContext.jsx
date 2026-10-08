"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAccessToken, getRefreshToken, clearTokens } from '../services/apiClient';
import { authService } from '../services/authService';
import { profileService } from '../services/profileService';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const token = getAccessToken();

      // Read stored user from localStorage first
      let localUser = null;
      let storedRole = null;
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('hiremind_user');
        storedRole = localStorage.getItem('hiremind_user_role');
        if (stored) {
          try {
            localUser = JSON.parse(stored);
          } catch (e) {
            console.error('Failed parsing stored user', e);
          }
        }
      }

      if (localUser) {
        const effectiveRole = storedRole || localUser.role || localUser.userType || (localUser.isHrTeamMember ? 'recruiter' : 'candidate');
        setUser({
          ...localUser,
          role: effectiveRole,
        });
      }

      if (!token && !localUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Sync with backend profile if available
      try {
        const res = await profileService.getProfile();
        if (res?.data) {
          setUser((prev) => {
            const currentStored = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('hiremind_user') || '{}') : {};
            const activeUser = prev || localUser || currentStored;

            const preservedRole =
              activeUser.role ||
              storedRole ||
              (activeUser.isHrTeamMember ? 'recruiter' : null) ||
              res.data.role ||
              'candidate';

            const updatedUser = {
              ...res.data,
              ...activeUser,
              email: activeUser.email || res.data.email,
              username: activeUser.username || res.data.username || activeUser.email?.split('@')[0],
              role: preservedRole,
            };

            if (typeof window !== 'undefined') {
              localStorage.setItem('hiremind_user', JSON.stringify(updatedUser));
              localStorage.setItem('hiremind_user_role', preservedRole);
            }
            return updatedUser;
          });
        }
      } catch (err) {
        // Keeps stored user if profile API call fails or is unauthenticated
      }
    } catch (err) {
      console.error('Auth context init error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (identifier, password, deviceType = 'desktop') => {
    setIsLoading(true);
    try {
      const res = await authService.login(identifier, password, deviceType);
      if (res?.data?.user) {
        const loggedUser = res.data.user;
        const role = loggedUser.role || loggedUser.userType || (loggedUser.isHrTeamMember ? 'recruiter' : 'candidate');
        const updatedLoggedUser = { ...loggedUser, role };
        setUser(updatedLoggedUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('hiremind_user', JSON.stringify(updatedLoggedUser));
          localStorage.setItem('hiremind_user_role', role);
        }
      }
      await refreshUser();
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (e) {
      console.warn('Logout notice:', e);
    } finally {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('hiremind_user');
        localStorage.removeItem('hiremind_user_role');
        localStorage.removeItem('hiremind_user_profile');
        sessionStorage.clear();
      }
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user || (typeof window !== 'undefined' && !!localStorage.getItem('hiremind_user')),
        isLoading,
        login,
        logout,
        refreshUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
