import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import Trash from "./pages/Trash";
import Starred from "./pages/Starred";

import ProtectedRoute from "./routes/ProtectedRoute";
import Recent from "./pages/Recent";

function App() {

  const token =
    localStorage.getItem("access");

  return (

    <Routes>

      {/* Public */}
      <Route
        path="/login"
        element={
          token
            ? <Navigate
                to="/dashboard"
                replace
              />
            : <LoginPage />
        }
      />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/document/:documentId"
          element={<Editor />}
        />

        <Route
          path="/trash"
          element={<Trash />}
        />

        <Route
          path="/starred"
          element={<Starred />}
        />
        <Route
          path="/recent"
          element={<Recent />}
        />

      </Route>

      {/* Default */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              token
                ? "/dashboard"
                : "/login"
            }
            replace
          />
        }
      />

    </Routes>

  );
}

export default App;