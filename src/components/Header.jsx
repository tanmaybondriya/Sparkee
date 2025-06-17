import React from "react";
import { useLocation } from "react-router-dom";
import { Bell, Clock } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Header = ({ notifications }) => {
  const location = useLocation();
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/new-vehicle":
        return "New Vehicle Check-In";
      case "/slots":
        return "Parking Slots";
      case "/requests":
        return "Pickup Requests";
      case "/user-details":
        return "User Details";
      default:
        return "Dashboard";
    }
  };

  const currentDate = "Monday, June 16, 2025";
  const currentTime = "04:48 PM";

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {getPageTitle()}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentDate}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell
              className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
              aria-label="Notifications"
            />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <span className="text-gray-600 dark:text-gray-300">
              {currentTime}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="sr-only peer"
              aria-label="Toggle theme"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
