import React from "react";


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
        <button
        >
            Contact Me
        </button>
        </div>
    </div>
  );
}

export default HomePage;