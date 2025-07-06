"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import { loginservice } from "../services/authservice";

interface User {
  id: number;
  role: string[];
  title_name?: string;
  name: string;
  surname: string;
  date_of_birth?: string;
  phone_number?: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (values: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setIsReady(true);
        return;
      }

      const userData = localStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    } finally {
      setLoading(false);
      setIsReady(true);
    }
  };

  const login = async (values: { email: string; password: string }) => {
    try {
      const res = await loginservice(values);
      
      
      if (res && res.user && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userData", JSON.stringify(res.user));
        setUser(res.user);
                
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
        
      } else {
        message.error("เข้าสู่ระบบไม่สำเร็จ - ข้อมูลไม่ถูกต้อง");
        console.error("Login failed - invalid response structure:", res);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
      message.error(errorMessage);

    }
  };

  const logout = async () => {
    try {
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("hasSeenWelcome");
      setUser(null);
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isReady,
      }}
    >
      {!loading ? children :  ""}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


