import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OuterFull from "./Comp/Auth/Auth";
import Dashboard from "./Comp/Inner/Dash";
import ProtectedRoute from "./Comp/Auth/Protect";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Page */}
        <Route path="/" element={<OuterFull />} />

        {/* Protected Page - Requires Login */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect all unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
