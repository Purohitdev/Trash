import { ReactNode } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode; // Allows JSX elements, text, fragments, etc.
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <>
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  );
}
