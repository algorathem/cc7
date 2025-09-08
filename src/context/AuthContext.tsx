import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'elderly' | 'caregiver') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Margaret Thompson',
    email: 'margaret@example.com',
    role: 'elderly',
    points: 1250,
    level: 5,
    avatar: 'https://thumbs.dreamstime.com/b/beautiful-50-year-old-woman-617685.jpg'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'caregiver',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  // Stub default user for local testing
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'caregiver',
    points: 0,
    level: 1,
    avatar: 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1'
  });

  //   const [user, setUser] = useState<User | null>({
  //   id: '1',
  //   name: 'Margaret Thompson',
  //   email: 'margaret@example.com',
  //   role: 'elderly',
  //   points: 0,
  //   level: 1,
  //   avatar: 'https://thumbs.dreamstime.com/b/beautiful-50-year-old-woman-617685.jpg'
  // });
  
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: 'elderly' | 'caregiver'): Promise<boolean> => {
    setIsLoading(true);
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('eldercare-user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eldercare-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
