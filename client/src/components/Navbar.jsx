import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { userService } from "../api/userService";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const location = useLocation();
  const hideAuthButtons =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoggedInUser(null);
        setIsDropdownOpen(false);
        return;
      }

      try {
        const data = await userService.getProfile();
        setLoggedInUser(data);
        setIsDropdownOpen(false);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        localStorage.removeItem("token");
        setLoggedInUser(null);
        setIsDropdownOpen(false);
      }
    };

    fetchProfile();
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full h-20 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo3.png" className="w-10 h-10" alt="Blogsy Logo" />
            <span className="text-3xl  web-title">Blogsy</span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center space-x-4">

            <Link to="/feed" className=" hover:bg-gray-100 p-2 rounded focus:underline">All Blogs</Link>
            {/* NIGHT MODE----> !IMPLEMENT LATER */}
            {/* <button className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </button> */}

            {loggedInUser ? (
              <div ref={dropdownRef} className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 cursor-pointer">
                  <img src={loggedInUser.profilePicture || "/avatar.png"} alt="Profile" className="w-10 h-10 rounded-full" />
                  <span className="font-semibold hidden sm:inline cursor-pointer ">{loggedInUser.firstName}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 text-center mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-40 flex flex-col items-center justify-center">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                    <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 rounded-xl btn btn-main text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !hideAuthButtons && (
                <>
                  <Link to="/login" className="flex items-center space-x-2 px-4 py-2 rounded-xl btn btn-main">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </svg>
                    <span>Login</span>
                  </Link>

                  <Link to="/signup" className="flex items-center space-x-2 px-4 py-2 rounded-xl btn btn-nav">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    <span>Sign Up</span>
                  </Link>
                </>
              )
            )}
          </div>


          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* MOBILE */}
        {isMobileMenuOpen && (

          <div className="lg:hidden absolute left-0 top-20 w-full bg-white z-40 border-t border-gray-200 p-4 space-y-3 shadow-md">

            {/* NIGHT MODE ---> IMPLEMENT LATER NO TIME */}
            {/* <button className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </button> */}

            {loggedInUser ? (
              <>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 rounded-xl btn btn-main">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              !hideAuthButtons && (
                <>
                  <Link to="/login" className="flex items-center space-x-2 px-4 py-2 rounded-xl btn btn-main">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                    </svg>
                    <span>Login</span>
                  </Link>

                  <Link to="/signup" className="flex items-center space-x-2 px-4 py-2 rounded-xl btn btn-nav">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    <span>Sign Up</span>
                  </Link>
                </>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
