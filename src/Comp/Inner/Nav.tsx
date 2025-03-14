import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

function Nav() {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center px-16 py-6">
    <div className="flex gap-4">
    <UserButton />
    <h1>{user?.firstName || "Unknown"}'s Dump Trash</h1>

    </div>

    <div className="button border rounded-3xl px-4 py-2">
        Add Trash
    </div>
    </div>
  );
}

export default Nav;

