import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, UserFormData } from '../types/user';
import type { UserRole } from '../types/auth';

interface UserContextType {
  users: User[];
  currentUser: User | null;
  isFirstUser: boolean;
  addUser: (data: UserFormData & { isAdmin: boolean }) => void;
  updateUser: (id: string, data: Partial<UserFormData & { isAdmin: boolean }>) => void;
  deleteUser: (id: string) => void;
  setAdmin: (id: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const isFirstUser = users.length === 0;

  const addUser = (data: UserFormData & { isAdmin: boolean }) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      name: data.name,
      role: data.role,
      isAdmin: data.isAdmin,
      createdAt: new Date().toISOString(),
    };

    setUsers(prev => [...prev, newUser]);
    if (isFirstUser) {
      setCurrentUser(newUser);
    }
  };

  const updateUser = (id: string, data: Partial<UserFormData & { isAdmin: boolean }>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, ...data }
          : user
      )
    );
  };

  const deleteUser = (id: string) => {
    if (users.find(user => user.id === id)?.isAdmin) {
      alert('管理者は削除できません');
      return;
    }
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const setAdmin = (id: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, isAdmin: true }
          : user
      )
    );
  };

  return (
    <UserContext.Provider value={{
      users,
      currentUser,
      isFirstUser,
      addUser,
      updateUser,
      deleteUser,
      setAdmin,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}