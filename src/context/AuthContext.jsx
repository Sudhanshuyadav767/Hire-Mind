"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
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
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Try fetching profile or stored user
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('hiremind_user');
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch (e) {
            console.error('Failed parsing stored user', e);
          }
        }
      }

      // Sync with backend profile if available
      try {
        const res = await profileService.getProfile();
        if (res?.data) {
          const updatedUser = { ...user, ...res.data };
          setUser(updatedUser);
          if (typeof window !== 'undefined') {
            localStorage.setItem('hiremind_user', JSON.stringify(updatedUser));
          }
        }
      } catch (err) {
        // If profile call fails but we have token, keep stored user
      }
    } catch (err) {
      console.error('Auth context init error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (identifier, password, deviceType = 'desktop') => {
    setIsLoading(true);
    try {
      const res = await authService.login(identifier, password, deviceType);
      if (res?.data?.user) {
        setUser(res.data.user);
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
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user || !!getAccessToken(),
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
