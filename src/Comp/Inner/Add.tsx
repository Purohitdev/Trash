// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { BsSun, BsMoon } from "react-icons/bs";
// import Nav from "./Nav";

// export default function Add() {
//   const [darkMode, setDarkMode] = useState(true);
//   const navigate = useNavigate();

//   const [blogName, setBlogName] = useState<string>("");
//   const [blogText, setBlogText] = useState<string>("");
//   const [image, setImage] = useState<File | null>(null);
//   const [voiceMail, setVoiceMail] = useState<File | null>(null);
//   const [pdf, setPdf] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!blogText && !image && !voiceMail && !pdf) {
//       setError("At least one of Blog Text, Image, Voice Mail, or PDF is required.");
//       return;
//     }

//     setError("");
//     console.log("Blog submitted:", { blogName, blogText, image, voiceMail, pdf });
//     navigate("/dashboard"); // Redirect to dashboard after submission
//   };

//   return (
//     <div className={`${darkMode ? "bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43] text-gray-300" : "bg-gradient-to-b from-[#f5f7fa] to-[#cbcef4] text-gray-800"} relative px-6 py-4 h-screen flex flex-col`}>

//       {/* Navigation Bar */}
//       <Nav showBackButton={true} />

//       {/* Dark Mode Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="absolute top-11 right-8 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 transition-all hover:bg-[#4c51bf] flex justify-center items-center"
//       >
//         {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
//       </button>

//       {/* Form Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-2xl mx-auto bg-opacity-20 backdrop-blur-lg p-6 "
//       >
//         <h2 className="text-center text-2xl font-semibold">Add Blog</h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">

//         <label className="text-sm font-medium">Enter  Title</label>

//           <input
//             type="text"
//             value={blogName}
//             onChange={(e) => setBlogName(e.target.value)}
//             required
//             className="p-2 rounded-md border focus:outline-none bg-transparent"
//           />


// <label className="text-sm font-medium">Write your blog text here (Optional)</label>

//           <textarea
//             value={blogText}
//             onChange={(e) => setBlogText(e.target.value)}
//             className="p-2 rounded-md border h-24 focus:outline-none bg-transparent"
//           />

//           <label className="text-sm font-medium">Upload an Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files?.[0] ?? null)}
//             className="p-2 bg-transparent border"
//           />

//           <label className="text-sm font-medium">Upload a Voice Mail</label>
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => setVoiceMail(e.target.files?.[0] ?? null)}
//             className="p-2 bg-transparent border"
//           />

//           <label className="text-sm font-medium">Upload a PDF</label>
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
//             className="p-2 bg-transparent border"
//           />

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button type="submit" className="bg-white text-black px-4 py-2 rounded-md w-1/3">
//             Submit Blog
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsSun, BsMoon } from "react-icons/bs";
import Nav from "./Nav";

export default function Add() {
  const navigate = useNavigate();

  // 🔥 Load dark mode preference from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // 🔥 Save dark mode in localStorage when toggled
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const [blogName, setBlogName] = useState<string>("");
  const [blogText, setBlogText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [voiceMail, setVoiceMail] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogText && !image && !voiceMail && !pdf) {
      setError("At least one of Blog Text, Image, Voice Mail, or PDF is required.");
      return;
    }

    setError("");
    console.log("Blog submitted:", { blogName, blogText, image, voiceMail, pdf });
    navigate("/dashboard"); // Redirect to dashboard after submission
  };

  return (
    <div className={`${darkMode ? "bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43] text-gray-300" : "bg-gradient-to-b from-[#f5f7fa] to-[#cbcef4] text-gray-800"} relative px-6 py-4 h-screen flex flex-col`}>

      {/* Navigation Bar */}
      <Nav showBackButton={true} />

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-11 right-8 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 transition-all hover:bg-[#4c51bf] flex justify-center items-center"
      >
        {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
      </button>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg ${darkMode ? "bg-[#1b1b1b]" : "bg-white border-gray-300 text-gray-800"}`}
      >
        <h2 className="text-center text-2xl font-semibold">Add Blog</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">

          <label className="text-sm font-medium">Enter Title</label>
          <input
            type="text"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            required
            className={`p-2 rounded-md border focus:outline-none bg-transparent ${darkMode ? "border-gray-500" : "border-gray-300"}`}
          />

          <label className="text-sm font-medium">Write your blog text here (Optional)</label>
          <textarea
            value={blogText}
            onChange={(e) => setBlogText(e.target.value)}
            className={`p-2 rounded-md border h-24 focus:outline-none bg-transparent ${darkMode ? "border-gray-500" : "border-gray-300"}`}
          />

          <label className="text-sm font-medium">Upload an Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="p-2 bg-transparent border"
          />

          <label className="text-sm font-medium">Upload a Voice Mail</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setVoiceMail(e.target.files?.[0] ?? null)}
            className="p-2 bg-transparent border"
          />

          <label className="text-sm font-medium">Upload a PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
            className="p-2 bg-transparent border"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} px-4 py-2 rounded-md w-1/3`}>
            Submit Blog
          </button>
        </form>
      </motion.div>
    </div>
  );
}
