import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaEnvelope, FaHome } from 'react-icons/fa'; 

const ComingSoon = ({ pageTitle = 'Coming Soon' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Rocket Icon with Animation */}
        <div className="flex justify-center mb-6">
          <FaRocket className="text-emerald-600 text-6xl animate-bounce" />
        </div>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          {pageTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          We're working hard to bring you this content. Stay tuned for something amazing!
        </p>

        {/* Progress Bar (Fake Loader) */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Under Construction</p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition duration-300"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-900 rounded-full font-semibold hover:bg-gray-300 transition duration-300"
          >
            <FaEnvelope className="mr-2" />
            Contact Us
          </Link>
        </div>

        {/* Optional Newsletter Signup */}
        {/* <div className="mt-12">
          <p className="text-gray-600 mb-4">Want to stay updated?</p>
          <form className="flex justify-center max-w-md mx-auto space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default ComingSoon;