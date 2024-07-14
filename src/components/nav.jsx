import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome,FaHeart,FaThumbsUp,FaList } from "react-icons/fa";

const nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative ">
      <nav className="bg-slate-900 text-white py-4 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-black text-2xl font-bold text-rose-600 ml-5">
            AnimePlanet
          </h1>
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-blue-400 hover:border-blue-400"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 5h20v2H0V8zm0 5h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <ul className="hidden lg:flex space-x-4 font-bold">
            <li>
              <Link
                to="/"
                className={`flex flex-row items-center mr-2 hover:text-blue-400 ${
                  isActive("/") ? "text-blue-400" : ""
                }`}
              >
              <FaHome className="mr-1"/>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/favorite"
                className={`flex flex-row items-center mr-2 hover:text-blue-400 ${
                  isActive("/favorite") ? "text-blue-400" : ""
                }`}
              >
              <FaHeart className="mr-1"/>

                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/recommendation"
                className={`flex flex-row items-center mr-2 hover:text-blue-400 ${
                  isActive("/recommendation") ? "text-blue-400" : ""
                }`}
              >
              <FaThumbsUp className="mr-1"/>

                Recommendation
              </Link>
            </li>
            <li>
              <Link
                to="/genre"
                className={`flex flex-row items-center mr-2 hover:text-blue-400 ${
                  isActive("/genre") ? "text-blue-400" : ""
                }`}
              > 
              <FaList className="mr-1"/>
                Genre
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-slate-900 w-64 z-50`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          <h1 className="font-black text-2xl font-bold text-rose-600">
            AnimePlanet
          </h1>
          <button
            onClick={toggleMenu}
            className="text-white hover:text-blue-400"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ul className="px-4 py-8 space-y-4 font-bold ">
          <li>
            <Link
              to="/"
              className={`flex flex-row items-center hover:text-blue-400 ${
                isActive("/") ? "text-blue-400" : "text-white"
              }`}
            >
            <FaHome className="mr-1"/>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/favorite"
              className={`flex flex-row items-center hover:text-blue-400 ${
                isActive("/favorite") ? "text-blue-400" : "text-white"
              }`}
            >
            <FaHeart className="mr-1"/>
              Favorites
            </Link>
          </li>
          <li>
            <Link
              to="/recommendation"
              className={`flex flex-row items-center hover:text-blue-400 ${
                isActive("/recommendation") ? "text-blue-400" : "text-white"
              }`}
            >
            <FaThumbsUp className="mr-1"/>

            Recommendation
            </Link>
          </li>
          <li>
            <Link
              to="/genre"
              className={`flex flex-row items-center hover:text-blue-400 ${
                isActive("/genre") ? "text-blue-400" : "text-white"
              }`}
            >
            <FaList className="mr-1"/>
              Genre
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default nav;
