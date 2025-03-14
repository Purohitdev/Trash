import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import OuterHome from "../Outer/OuterHome";

export default function Home() {
  return (
    <>
      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>

      <SignedOut>
        <OuterHome />
      </SignedOut>
    </>
  );
}
