import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
 if (!document.cookie.includes("token=")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}       