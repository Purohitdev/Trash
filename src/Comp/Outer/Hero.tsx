// import Nav from './Nav'

// function Hero() {
//   return (
//     <div className='h-screen bg-[#151414]'>
//         <Nav/>
//     </div>
//   )
// }

// export default Hero

// import { useState, useEffect } from "react";
// import { FaSun, FaMoon } from "react-icons/fa";
// import Nav from "./Nav";

// export default function Hero() {
//   const [darkMode, setDarkMode] = useState(
//     typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? "bg-[#0d0d0d] text-gray-300" : "bg-[#f5f7fa] text-gray-800"
//         }`}
//     >
//       <div
//         className={`w-full min-h-screen flex flex-col  items-center px-6 md:px-16 transition-all duration-300  ${darkMode
//             ? "bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43]"
//             : "bg-gradient-to-b from-[#f5f7fa] to-[#cbcef4]"
//           }`}
//       >
//         {/* Navbar */}
//         <Nav />
//         {/* Main Content */}
//         <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between  py-[20vh]">
//           <div className="text-center md:text-left md:max-w-md">
//             <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
//               Store and Manage Your Files with Ease.
//             </h2>
//             <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
//               Trash Dump is a secure and easy-to-use platform for storing notes, images, PDFs, and more.
//             </p>
//             <button className="mt-8 bg-[#7b2ff7] text-white px-8 py-4 text-lg rounded-lg hover:bg-[#4c51bf] transition-all font-semibold">
//               Get Started
//             </button>
//           </div>
//           <div className="mt-12 md:mt-0">
//             <img
//               src="https://cdn.prod.website-files.com/5da47f90817b2c18f960003e/5e6f1fb37ef39455e3568bf7_latest-placeholder.webp"
//               alt="File Management Illustration"
//               className="w-80 md:w-[450px] h-auto drop-shadow-lg mix-blend-color-dodge"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Nav from "./Nav";

export default function Hero() {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? "bg-[#0d0d0d] text-gray-300" : "bg-[#f5f7fa] text-gray-800"
        }`}
    >
      <div
        className={`w-full min-h-screen flex flex-col items-center px-6 md:px-16 transition-all duration-300 ${darkMode
            ? "bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43]"
            : "bg-gradient-to-b from-[#f5f7fa] to-[#cbcef4]"
          }`}
      >
        <Nav />

        {/* Main Content */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between py-[18vh] gap-8  ">
          <div className="text-center md:text-left w-[60%] ">
            <h2 className="text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Organize, Secure, and <br />
              <span className="text-[#7b2ff7]">Access Your Notes</span> Anytime.
            </h2>

            <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Trash Dump is a secure, user-friendly platform to store notes, images, PDFs, and more.
            </p>
            <button className="mt-8 bg-[#1D2938] text-white px-10 py-4 text-lg rounded-full hover:bg-[#592bd1] transition-all duration-300 shadow-md hover:shadow-lg">
              Get Started
            </button>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center items-center">
            <img
              src="https://cdn.prod.website-files.com/5da47f90817b2c18f960003e/5e6f1fb37ef39455e3568bf7_latest-placeholder.webp"
              alt="File Management Illustration"
              className="w-80 md:w-[450px] h-auto drop-shadow-xl mix-blend-lighten transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
