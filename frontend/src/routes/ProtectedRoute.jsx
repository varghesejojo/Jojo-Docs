import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();

  const accessToken = localStorage.getItem("access");

  // Not logged in
  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  try {
    // Decode JWT payload
    const payload = JSON.parse(
      atob(accessToken.split(".")[1])
    );

    // Check token expiry
    if (payload.exp * 1000 < Date.now()) {
      localStorage.clear();

      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }

    // Logged in
    return <Outlet />;

  } catch (error) {
    localStorage.clear();

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
}

export default ProtectedRoute;