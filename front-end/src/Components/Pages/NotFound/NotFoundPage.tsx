import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      
      {/* Main Content */}
      <div className="max-w-md w-full text-center z-20">
        
        {/* Stylish 404 heading */}
        <div className="relative mb-10">
          <h1 className="text-[110px] sm:text-[140px] font-bold opacity-10 absolute inset-0 select-none">
            404
          </h1>
          <h1 className="text-[90px] sm:text-[120px] font-bold text-white relative z-10">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 leading-relaxed">
            The page you're trying to access doesn’t exist or has been moved.
            Let’s take you somewhere safe.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link
            to="/"
            className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 hover:border-gray-400"
          >
            Go Back
          </button>
        </div>

        {/* Pulsing Dots */}
        <div className="space-y-3">
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">Error code: 404 | Page not found</p>
        </div>

      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0"></div>

      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.25) 2px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
