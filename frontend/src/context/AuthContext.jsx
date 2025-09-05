import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/me", { withCredentials: true });
        console.log("🔍 Auth check response:", response.data);
        if (response.data.success && response.data.admin) {
          setAdmin(response.data.admin);
        } else {
          setAdmin(null);
        }
      } catch (error) {
        console.log("🔍 Auth check failed:", error.response?.data || error.message);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
