import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("access");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    if (payload.exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;

  } catch {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;