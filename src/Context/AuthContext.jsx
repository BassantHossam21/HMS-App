import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserData = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const cleanToken = token.replace("Bearer ", "");
        const decoded = jwtDecode(cleanToken);
        console.log("Decoded token:", decoded);
        setUser(decoded); // role، id، أي بيانات من token
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("access_token");
        setUser(null);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  // عند mount
  useEffect(() => {
    saveUserData();
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, saveUserData, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
