// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { loginUser, createUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setUser(response.data.user);
      setToken(response.data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Login failed" };
    }
  };

  const register = async (data) => {
    try {
      const response = await createUser(data);
      setUser(response.data.user);
      setToken(response.data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
