import { SignInButton } from "@clerk/clerk-react";

function Nav() {
  return (
    <div className="flex justify-between items-center px-6 py-6 w-full mt-12">
      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
        <span className="text-[#7b2ff7]">Trash</span> Dump
      </h1>

      {/* Sign-In Button */}
      <SignInButton>
        <button className="px-6 py-2 rounded-full bg-[#1D2938] text-white text-lg font-medium transition-all duration-300 hover:bg-[#23232f] shadow-md">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
}

export default Nav;
