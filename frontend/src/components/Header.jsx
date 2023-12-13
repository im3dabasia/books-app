import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <div className="flex flex-row">
                <div className="w-min text-lime-500 text-4xl font-bold font-['Inter']">
                  BOOK
                </div>
                <div className="w-min h-7 text-teal-500 text-opacity-80 text-4xl font-bold font-['Inter']">
                  STORE
                </div>
              </div>
            </Link>

            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="/"
                    className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-book"
                    className="text-white bg-lime-500 hover:bg-lime-700 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Add Book
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
