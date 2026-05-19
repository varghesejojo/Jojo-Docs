import { createContext, useContext, useEffect, useState, useRef } from "react";
import api from "../../../config/api";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchingRef = useRef(false);

  const fetchUser = async () => {
    if (fetchingRef.current) return;
    console.log("fetchUser called");
    console.log("API URL:", `${api.defaults.baseURL}docs/user-details/`);
    
    fetchingRef.current = true;
    try {
      const res = await api.get("docs/user-details/");
      console.log("User details response:", res);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error("Failed to fetch user:", error);
    //   localStorage.clear();
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };


 useEffect(() => {
    const access = localStorage.getItem("access");
    const storedUser = localStorage.getItem("user");
    
    if (access && !storedUser) {
        fetchUser();
    } else if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
    } else {
        setLoading(false);
    }
}, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);