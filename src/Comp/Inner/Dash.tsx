// import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
// import { motion } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import { MdDeleteSweep } from "react-icons/md";
// import { BsSun, BsMoon } from "react-icons/bs";
// import Nav from "./Nav";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

// export default function Dashboard() {
//   const { user } = useUser();
//   const containerRef = useRef(null);

//   // 🔥 Load dark mode from localStorage
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("darkMode") === "true";
//   });

//   // 🔥 Save dark mode in localStorage when toggled
//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode.toString());
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode((prevMode) => !prevMode);
//   };

//   const samplePdf = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
//   const sampleImages = [
//     "https://i.pinimg.com/736x/37/7f/a3/377fa38ab73de21d0436de79dc3e476d.jpg",
//     "https://i.pinimg.com/736x/67/0a/28/670a28ae3f9a721d21e171086c189f85.jpg",
//     "https://i.pinimg.com/736x/f1/99/bb/f199bbe6e327d9efc899d4b0c429d249.jpg",
//   ];
//   const sampleAudio = [
//     "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//     "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
//   ];
//   const blogNames = ["Tech Innovations", "Daily Life Hacks", "AI Revolution"];

//   return (
//     <SignedIn>
//       <div className={`${darkMode ? "bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43] text-gray-300" : "bg-gradient-to-b from-[#f5f7fa] to-[#cbcef4] text-gray-800"} relative px-6 py-4 h-screen flex flex-col`}>
        
//         <Nav />

//         {/* 🔥 Dark Mode Toggle Button */}
//         <button
//           onClick={toggleDarkMode}
//           className="absolute top-11 right-8 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 transition-all hover:bg-[#4c51bf] flex justify-center items-center"
//         >
//           {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
//         </button>

//         {/* Animated Heading */}
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0.1 }}
//           animate={{ scale: 2.3, opacity: 0.15 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-extrabold bg-gradient-to-r from-[#7b2ff7] to-[#4c51bf] text-transparent bg-clip-text tracking-wide"
//         >
//           DOCS.
//         </motion.div>

//         {/* Blog List */}
//         <div ref={containerRef} className="flex-1 overflow-y-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 px-4 py-10">
//           {[...Array(20)].map((_, index) => {
//             const contentType = Math.floor(Math.random() * 5);

//             return (
//               <motion.div
//                 key={index}
//                 drag
//                 dragConstraints={containerRef}
//                 dragElastic={0.5}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 whileDrag={{ scale: 1.08, rotate: 3, zIndex: 10 }}
//                 className={`${darkMode ? "bg-[#1b1b1b] text-gray-300" : "bg-white border-gray-300 text-gray-800 shadow-xl"} break-inside-avoid w-full mb-6 p-5 rounded-2xl shadow-lg backdrop-blur-lg cursor-grab active:cursor-grabbing overflow-hidden hover:scale-105 transition-all`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <UserButton />
//                     <p className="font-medium">~ {user?.firstName || "Unknown"}</p>
//                   </div>
//                   <button className="text-gray-500 hover:text-red-500 transition-all"><MdDeleteSweep /></button>
//                 </div>

//                 <h3 className="mt-3 font-extrabold text-lg">{blogNames[index] || `Blog ${index + 1}`}:</h3>

//                 {contentType === 0 && <p className="text-sm line-clamp-3">This is a text-based blog post.</p>}

//                 {contentType === 1 && (
//                   <img src={sampleImages[index % sampleImages.length]} alt="Blog" className="w-full mt-3 rounded-lg shadow-lg" />
//                 )}

//                 {contentType === 2 && (
//                   <audio controls className="w-full mt-3 rounded-md ">
//                     <source src={sampleAudio[index % sampleAudio.length]} type="audio/mpeg" />
//                     Your browser does not support the audio element.
//                   </audio>
//                 )}

//                 {contentType === 3 && (
//                   <div>
//                     <img src={sampleImages[index % sampleImages.length]} alt="Blog" className="w-full mt-3 rounded-lg shadow-lg" />
//                     <audio controls className="w-full mt-3 rounded-md ">
//                       <source src={sampleAudio[index % sampleAudio.length]} type="audio/mpeg" />
//                       Your browser does not support the audio element.
//                     </audio>
//                   </div>
//                 )}

//                 {contentType === 4 && (
//                   <div className="mt-3">
//                     <Document
//                       file={samplePdf}
//                       className="border border-gray-600 p-3 rounded-md overflow-hidden shadow-md"
//                       loading={<p className="text-sm">Loading PDF...</p>}
//                     >
//                       <Page pageNumber={1} width={250} />
//                     </Document>
//                     <a href={samplePdf} target="_blank" rel="noopener noreferrer">
//                       <p className="text-sm text-blue-400 mt-2 underline cursor-pointer hover:text-blue-300">View full PDF</p>
//                     </a>
//                   </div>
//                 )}

//                 <p className="text-xs mt-3">Size: {Math.random().toFixed(2)} MB</p>
//                 <p className="text-xs text-blue-400 mt-1">Last updated - 2025-03-13</p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </SignedIn>
//   );
// }


import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";
import Nav from "./Nav";

export default function Dashboard() {
  const { user } = useUser();
  const containerRef = useRef(null);

  // 🔥 Load dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // 🔥 Save dark mode in localStorage when toggled
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <SignedIn>
      <div className={`${darkMode ? "bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43] text-gray-300" : "bg-gradient-to-b from-[#f5f7fa] to-[#cbcef4] text-gray-800"} relative px-6 py-4 h-screen flex flex-col`}>
        
        <Nav />

        {/* 🔥 Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-11 right-8 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 transition-all hover:bg-[#4c51bf] flex justify-center items-center"
        >
          {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>

        {/* Animated Heading */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.1 }}
          animate={{ scale: 2.3, opacity: 0.15 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-extrabold bg-gradient-to-r from-[#7b2ff7] to-[#4c51bf] text-transparent bg-clip-text tracking-wide"
        >
          DOCS.
        </motion.div>

        {/* Blog List (Now Empty - Ready for API Data) */}
        <div ref={containerRef} className="flex-1 overflow-y-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 px-4 py-10">
          {/* Map over your real data here */}
        </div>
      </div>
    </SignedIn>
  );
}
