import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Editor from "./pages/Editor";

function App() {
  const token = localStorage.getItem("access");

  return (
    <Routes>

      {/* Public */}
      <Route
        path="/login"
        element={
          token
            ? <Navigate to="/dashboard" replace />
            : <LoginPage />
        }
      />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Route>
      <Route
        path="/document/:documentId"
        element={<Editor />}
      />

      {/* Default */}
      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/dashboard" : "/login"}
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;