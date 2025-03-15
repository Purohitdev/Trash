import Nav from "./Nav";

export default function Hero() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#0d0d0d] text-gray-300">
      <div className="w-full min-h-screen flex flex-col items-center px-6 md:px-16 bg-gradient-to-b from-[#0d0d0d] to-[#1e1f43]">
        {/* Navbar */}
        <Nav />

        {/* Main Content */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between py-[18vh] gap-12">
          <div className="text-center md:text-left md:max-w-lg">
            <h2 className="text-6xl font-extrabold text-white leading-tight">
              Store & Manage <br />
              <span className="text-[#7b2ff7]">Your Files</span> with Ease.
            </h2>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Trash Dump is a secure, user-friendly platform to store notes, images, PDFs, and more.
            </p>
            <button className="mt-8 bg-[#7b2ff7] text-white px-10 py-4 text-lg rounded-full hover:bg-[#592bd1] transition-all duration-300 shadow-md hover:shadow-lg">
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
