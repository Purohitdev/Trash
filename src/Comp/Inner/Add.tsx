import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsSun, BsMoon } from "react-icons/bs";
import { useUser } from "@clerk/clerk-react";
import Nav from "./Nav";

const API_URL = "http://localhost:5000/api/trash";

export default function Add() {
  const navigate = useNavigate();
  const { user } = useUser();

  // Dark mode states
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Form states
  const [blogName, setBlogName] = useState<string>("");
  const [blogText, setBlogText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [voiceMail, setVoiceMail] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      return data.url;
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogText.trim() && !image && !voiceMail && !pdf) {
      setError("At least one of Blog Text, Image, Voice Mail, or PDF is required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Upload files if present
      const imageUrl = image ? await uploadFile(image, 'image') : null;
      const voiceMailUrl = voiceMail ? await uploadFile(voiceMail, 'audio') : null;
      const pdfUrl = pdf ? await uploadFile(pdf, 'pdf') : null;

      // Create blog post
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          name: blogName,
          blogText: blogText.trim(),
          image: imageUrl,
          voiceMail: voiceMailUrl,
          pdf: pdfUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Failed to submit blog. Please try again.");
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43] text-gray-300" : "bg-gradient-to-b from-[#f5f7fa] to-[#cbcef4] text-gray-800"} relative px-6 py-4 h-screen flex flex-col`}>
      <Nav showBackButton={true} />

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-11 right-8 p-2 bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 transition-all hover:bg-[#4c51bf] flex justify-center items-center"
      >
        {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
      </button>

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

          <button 
            type="submit" 
            disabled={loading}
            className={`${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            } px-4 py-2 rounded-md w-1/3 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Blog"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
