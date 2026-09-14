'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  name: string;
  email: string;
  avatar: string;
  isGoogleVerified: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loginWithGoogle: (email?: string, name?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'mor_google_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Hydrate user session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const loginWithGoogle = (email?: string, name?: string) => {
    const finalEmail = email || 'patient.care@gmail.com';
    const finalName = name || (finalEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
    
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(finalName)}&background=007791&color=fff&bold=true`;

    const newUser: AuthUser = {
      name: finalName,
      email: finalEmail,
      avatar,
      isGoogleVerified: true,
    };

    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // ignore
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        logout,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
