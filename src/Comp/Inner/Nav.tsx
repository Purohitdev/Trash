import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Nav({ showBackButton = false }: { showBackButton?: boolean }) {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-16 py-6">
      <div className="flex gap-4">
        <UserButton />
        <h1>{user?.firstName || "Unknown"}'s Dump Trash</h1>
      </div>

      {showBackButton ? (
        <button
          className="rounded-3xl px-4 py-2 bg-gray-800 text-white"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      ) : (
        <button
          className="rounded-3xl px-4 py-2 bg-gray-800 text-white"
          onClick={() => navigate("/add")}
        >
          Add Trash
        </button>
      )}
    </div>
  );
}

export default Nav;
