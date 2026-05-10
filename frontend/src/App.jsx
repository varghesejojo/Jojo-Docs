import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

        {/* Default */}
        <Route path="*" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;