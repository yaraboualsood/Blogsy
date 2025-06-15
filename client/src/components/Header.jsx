import React from 'react'
import { Link, useNavigate } from 'react-router';

export default function Header() {

    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const handleStartWriting = () => {
        if (isAuthenticated) {
            navigate("/new");
        } else {
            navigate("/login");
        }
    };

    return (
        <header id="home" className="relative min-h-screen  overflow-hidden">

            {/* bg img */}
            <div className="absolute inset-0 lg:right-0 lg:left-1/2">
                <img
                    src="/header-design.jpg"
                    alt="header image"
                    className="w-full h-full object-cover object-center lg:object-left opacity-80"
                />
            </div>

            {/* content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
                <div className="w-full lg:w-1/2 text-center lg:text-left bg-white bg-opacity-90 lg:bg-opacity-0 p-6 lg:p-0 rounded-2xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 mb-4 lg:mb-6">
                        ❝Everyone has a <span className="highlight inline-block mt-2">story</span> to tell
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-gray-700 mb-8 lg:mb-12 header-p max-w-2xl mx-auto lg:mx-0">
                        A place to read, write, and deepen your understanding
                    </p>


                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button onClick={handleStartWriting} className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-lg btn-main cursor-pointer ">
                            Start Writing
                        </button>
                        <Link to="/feed" className="px-6 sm:px-8 py-3 sm:py-4  rounded-xl font-semibold text-base sm:text-lg transform hover:scale-105 transition-all duration-300 shadow-lg btn-nav">
                            Explore Stories
                        </Link>
                    </div>
                </div>
            </div>


        </header>

    );
}