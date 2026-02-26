import { createContext, useContext, useEffect, useState } from "react";

import api from "../api/client";

type Role = "admin" | "user" | "read-only";

type AuthUser = {
  email: string;
  role: Role;
  firstName?: string;
  lastName?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  //   loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  //   loading: true,

  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const self = async () => {
      try {
        const res = await api.get("/api/auth/self");
        setUser(res.data?.user || null);
      } catch {
        setUser(null);
      }
    };
    self();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/api/auth/login", { email, password });
    console.log(res, "sss");
    setUser(res.data?.data || null);
  };

  const logout = async () => {
    await api.post("/api/auth/logout",{});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
