import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OuterFull from "./Comp/Auth/Auth";
import Dashboard from "./Comp/Inner/Dash";
import ProtectedRoute from "./Comp/Auth/Protect";
import Add from "./Comp/Inner/Add";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Page */}
        <Route path="/" element={<OuterFull />} />

        {/* Protected Pages - Require Login */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          }
        />

        {/* Redirect all unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
