import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteAuth({ children }) {
  const { user } = useContext(AuthContext);
  
  return user ? <Navigate to="/" /> : children;
}
