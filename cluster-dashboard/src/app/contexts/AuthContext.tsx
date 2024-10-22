// AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  userId: string | null;
  name: string | null;
  email: string | null;
  setUserInfo: (userInfo: { userId: string; name: string; email: string }) => void;
  clearUserInfo: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const setUserInfo = (userInfo: { userId: string; name: string; email: string }) => {
    setUserId(userInfo.userId);
    setName(userInfo.name);
    setEmail(userInfo.email);
  };

  const clearUserInfo = () => {
    setUserId(null);
    setName(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ userId, name, email, setUserInfo, clearUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
