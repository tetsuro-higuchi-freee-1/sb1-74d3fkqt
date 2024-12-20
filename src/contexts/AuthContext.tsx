import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '../types/auth';
import type { UserRole } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, isAdmin?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole, isAdmin = false) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      email: `${role}@example.com`,
      role,
      // Allow admin privileges for any role when explicitly requested
      isAdmin: isAdmin
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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