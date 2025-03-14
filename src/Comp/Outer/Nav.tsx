import {  SignInButton } from "@clerk/clerk-react";

function Nav() {
  return (
    <div className="flex justify-between items-center px-16 py-6 bg-[#444747] text-white">
        <h1>Trash</h1>

        <SignInButton />
     
    </div>
  )
}

export default Nav