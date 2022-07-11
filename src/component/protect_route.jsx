import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  if (!localStorage.getItem("token")) {
    return <Navigate replace to="/login" />;
  } else {
    return children;
  }
}
