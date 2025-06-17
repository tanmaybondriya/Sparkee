import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Plus,
  Grid3x3,
  Bell,
  User,
  Users,
  Menu,
  ChevronLeft,
  BarChart2,
} from "lucide-react";

const Sidebar = ({ vehicles, valetStaff }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      {/* Sidebar Container */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-white dark:bg-gray-800 shadow-lg h-screen transition-all duration-300 ease-in-out relative z-10`}
      >
        {/* Sidebar Content */}
        <div className="h-full flex flex-col">
          {/* Header Section */}
          <div
            className={`p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center ${
              !isOpen && "p-4"
            }`}
          >
            {isOpen ? (
              <div className="text-center">
                <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  Sparkee
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Valet Management
                </p>
              </div>
            ) : (
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                S
              </h1>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex-1">
            <div className="px-4 space-y-2">
              <Link
                to="/"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${!isOpen && "justify-center space-x-0"}`}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                <Home className="w-5 h-5" />
                {isOpen && <span>Dashboard</span>}
              </Link>
              <Link
                to="/new-vehicle"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/new-vehicle"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${!isOpen && "justify-center space-x-0"}`}
                aria-current={
                  location.pathname === "/new-vehicle" ? "page" : undefined
                }
              >
                <Plus className="w-5 h-5" />
                {isOpen && <span>New Check-In</span>}
              </Link>
              <Link
                to="/slots"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/slots"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${!isOpen && "justify-center space-x-0"}`}
                aria-current={
                  location.pathname === "/slots" ? "page" : undefined
                }
              >
                <Grid3x3 className="w-5 h-5" />
                {isOpen && <span>Parking Slots</span>}
              </Link>
              <Link
                to="/requests"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/requests"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${!isOpen && "justify-center space-x-0 relative"}`}
                aria-current={
                  location.pathname === "/requests" ? "page" : undefined
                }
              >
                <Bell className="w-5 h-5" />
                {isOpen && <span>Requests</span>}
                {vehicles.filter((v) => v.status === "Requested").length >
                  0 && (
                  <span
                    className={`bg-red-500 text-white text-xs rounded-full px-2 py-1 ${
                      isOpen
                        ? "ml-auto"
                        : "absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center"
                    }`}
                  >
                    {vehicles.filter((v) => v.status === "Requested").length}
                  </span>
                )}
              </Link>
              <Link
                to="/user-details"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/user-details"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${!isOpen && "justify-center space-x-0"}`}
                aria-current={
                  location.pathname === "/user-details" ? "page" : undefined
                }
              >
                <Users className="w-5 h-5" />
                {isOpen && <span>User Details</span>}
              </Link>
              <Link
                to="/analytics"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === "/analytics"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${!isOpen && "justify-center space-x-0"}`}
                aria-current={
                  location.pathname === "/Analytics" ? "page" : undefined
                }
              >
                <BarChart2 className="w-5 h-5" />
                {isOpen && <span>Analytics & Reports</span>}
              </Link>
            </div>

            {/* Valet Staff Section */}
            <div className={`mt-8 px-4 ${!isOpen && "hidden"}`}>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Valet Staff
                </h4>
                <div className="space-y-2">
                  {valetStaff.slice(0, 3).map((valet) => (
                    <div
                      key={valet.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-gray-600 dark:text-gray-300">
                        {valet.name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          valet.status === "Available"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {valet.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
