import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import Nav from "./Nav";

const API_URL = "https://trash-backend.onrender.com/api/trash";

interface TrashItem {
  _id: string;
  userId: string;
  name: string;
  blogText?: string;
  image?: string;
  voiceMail?: string;
  pdf?: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useUser();
  const containerRef = useRef(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  
  const [items, setItems] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [readMoreState, setReadMoreState] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    fetchItems();
  }, [user]);

  const fetchItems = async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`${API_URL}/${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch items');
      
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError("Failed to load items");
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete item');
      
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <SignedIn>
      <div className={`${darkMode ? "bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43] text-gray-300" : "bg-gradient-to-b from-[#f5f7fa] to-[#cbcef4] text-gray-800"} relative px-6 py-4 h-screen flex flex-col`}>
        <Nav />

        <button
          onClick={() => setDarkMode(prev => !prev)}
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

        {/* Blog List */}
        <div ref={containerRef} className="flex-1 overflow-y-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 px-4 py-10">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : items.length === 0 ? (
            <p>No items found. Start by adding some!</p>
          ) : (
            items.map((item) => {
              const readMore = readMoreState[item._id] || false;
              const textToShow = readMore ? item.blogText : truncateText(item.blogText || "", 100);

              return (
                <motion.div
                  key={item._id}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.5}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileDrag={{ scale: 1.08, rotate: 3, zIndex: 10 }}
                  className={`${darkMode ? "bg-[#1b1b1b] text-gray-300" : "bg-white border-gray-300 text-gray-800 shadow-xl"} break-inside-avoid w-full mb-6 p-5 rounded-2xl shadow-lg backdrop-blur-lg cursor-grab active:cursor-grabbing`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserButton />
                      <p className="font-medium">~ {user?.firstName}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="text-gray-500 hover:text-red-500 transition-all"
                    >
                      <MdDeleteSweep size={20} />
                    </button>
                  </div>

                  <h3 className="mt-3 font-extrabold text-lg">{item.name}</h3>

                  {item.blogText && (
                    <div className="text-sm mt-2">
                      <p>{textToShow}</p>
                      {item.blogText.split(" ").length > 100 && (
                        <button 
                          onClick={() => setReadMoreState(prev => ({ ...prev, [item._id]: !readMore }))}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {readMore ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </div>
                  )}

                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full mt-3 rounded-lg shadow-lg" />
                  )}

                  {item.voiceMail && (
                    <audio controls className="w-full mt-3">
                      <source src={item.voiceMail} type="audio/mpeg" />
                    </audio>
                  )}

                  {item.pdf && (
                    <a 
                      href={item.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block mt-3 text-blue-400 hover:text-blue-300"
                    >
                      View PDF
                    </a>
                  )}

                  <p className="text-xs mt-3">
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </SignedIn>
  );
}
