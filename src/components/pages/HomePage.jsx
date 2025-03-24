import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 `}>
        Hi, I'm Samuel
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Full Stack Software Engineer
        </h2>
        <p className="text-lg mb-8 max-w-lg">
        I build responsive web applications with modern technologies.
        Passionate about clean code, user experience, and solving complex problems.
        </p>
        <div className="flex flex-wrap gap-4">
        <button

        >
            View My Work
        </button>
        <Link to="/contact">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-500"
        >
          
            Contact Me
        </button>
        </Link>
        </div>
    </div>
  );
}

export default HomePage;