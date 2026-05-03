import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // load user once on app start
  useEffect(() => {
    const stored = localStorage.getItem("user");

    try {
      if (stored && stored !== "undefined") {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.log("Bad user in storage");
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, []);

  // login
  const loginUser = (data) => {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };

  // logout
  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}