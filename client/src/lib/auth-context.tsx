import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Admin } from '@shared/schema';

interface AuthContextType {
  admin: Admin | null;
  login: (admin: Admin, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedAdmin = localStorage.getItem('admin');
    
    if (storedToken && storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (e) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('admin');
      }
    }
  }, []);

  const login = (adminData: Admin, token: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('admin', JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
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
