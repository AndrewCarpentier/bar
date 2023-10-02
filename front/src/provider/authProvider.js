import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useState } from "react";
import {
  getCurrentUser,
  signin as login,
  signout as logout,
} from "../api/auth";
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(useLoaderData());

  async function signin(credentials) {
    try {
      setUser(await login(credentials));
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signout() {
    await logout();
    setUser(null);
  }

  async function edit() {
    setUser(await getCurrentUser());
  }

  return (
    <AuthContext.Provider value={{ user, signout, signin, edit }}>
      {children}
    </AuthContext.Provider>
  );
}
