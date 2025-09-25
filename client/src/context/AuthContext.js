// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { loginUser, createUser } from "../services/api";
import { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // initialize from localStorage if present
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Keep axios defaults and localStorage in sync whenever token or user changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthToken(token);
    } else {
      localStorage.removeItem("token");
      setAuthToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      // backend returns { access_token: "...", user: { ... } }
      const accessToken = response.data.access_token;
      const userData = response.data.user;

      setUser(userData);
      setToken(accessToken);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Login failed" };
    }
  };

  const register = async (data) => {
    try {
      const response = await createUser(data);
      // if backend returns token+user
      const accessToken = response.data.access_token;
      const userData = response.data.user;

      setUser(userData);
      setToken(accessToken || null);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
