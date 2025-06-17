import React, { useState, useEffect } from "react";
import {
  Bell,
  User,
  LogOut,
  Settings,
  Home,
  Plus,
  Grid3X3,
  Inbox,
  Car,
  Users,
  MapPin,
  Filter,
  Search,
  QrCode,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const SparkeeApp = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New vehicle checked in - Gate A",
      time: "2 mins ago",
      type: "info",
    },
    {
      id: 2,
      message: "Valet requested for pickup - Slot B12",
      time: "5 mins ago",
      type: "warning",
    },
    {
      id: 3,
      message: "Vehicle delivered successfully",
      time: "10 mins ago",
      type: "success",
    },
  ]);

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      guestName: "John Doe",
      mobile: "+91-9876543210",
      vehicleNumber: "MH01AB1234",
      type: "Car",
      slot: "A12",
      status: "Parked",
      checkIn: "2:30 PM",
      valet: "Raj Kumar",
    },
    {
      id: 2,
      guestName: "Jane Smith",
      mobile: "+91-9876543211",
      vehicleNumber: "KA02CD5678",
      type: "SUV",
      slot: "B08",
      status: "In Transit",
      checkIn: "3:15 PM",
      valet: "Amit Singh",
    },
    {
      id: 3,
      guestName: "Mike Johnson",
      mobile: "+91-9876543212",
      vehicleNumber: "DL03EF9012",
      type: "Motorcycle",
      slot: "C05",
      status: "Ready for Pickup",
      checkIn: "1:45 PM",
      valet: "Suresh Yadav",
    },
  ]);

  const [parkingSlots] = useState(() => {
    const slots = [];
    const sections = ["A", "B", "C"];
    sections.forEach((section) => {
      for (let i = 1; i <= 20; i++) {
        const slotId = `${section}${i.toString().padStart(2, "0")}`;
        const occupied = Math.random() > 0.6;
        slots.push({
          id: slotId,
          section,
          status: occupied ? "occupied" : "free",
          vehicle: occupied
            ? vehicles[Math.floor(Math.random() * vehicles.length)]
            : null,
        });
      }
    });
    return slots;
  });

  const [requests] = useState([
    {
      id: 1,
      guestName: "John Doe",
      vehicleNumber: "MH01AB1234",
      slot: "A12",
      requestTime: "4:30 PM",
      status: "Pending",
      priority: "high",
    },
    {
      id: 2,
      guestName: "Sarah Wilson",
      vehicleNumber: "GJ04XY7890",
      slot: "B15",
      requestTime: "4:25 PM",
      status: "Assigned",
      valet: "Raj Kumar",
      priority: "medium",
    },
    {
      id: 3,
      guestName: "David Brown",
      vehicleNumber: "MH12PQ3456",
      slot: "C03",
      requestTime: "4:20 PM",
      status: "Completed",
      priority: "low",
    },
  ]);

  const theme = darkMode ? "dark" : "light";

  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
      e.preventDefault();
      if (email && password) {
        setUser({ name: "Admin User", email });
        setCurrentPage("dashboard");
      }
    };

    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-blue-50 to-indigo-100"
        }`}
      >
        <div
          className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1
              className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
            >
              Sparkee
            </h1>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mt-2`}
            >
              Valet Parking Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="admin@sparkee.com"
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`inline-flex items-center px-3 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } transition-colors`}
            >
              {darkMode ? (
                <Sun className="h-4 w-4 mr-2" />
              ) : (
                <Moon className="h-4 w-4 mr-2" />
              )}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Navbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (
      <nav
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b px-6 py-4 flex items-center justify-between relative z-50`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`md:hidden p-2 rounded-lg ${
              darkMode
                ? "text-gray-400 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <h1
              className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
            >
              Sparkee
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-lg ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className={`absolute right-0 mt-2 w-80 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border rounded-lg shadow-lg`}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h3
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b ${
                        darkMode
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-100 hover:bg-gray-50"
                      } cursor-pointer`}
                    >
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        } mt-1`}
                      >
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className={`flex items-center space-x-2 p-2 rounded-lg ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-full">
                <User className="h-4 w-4 text-white" />
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>

            {showProfile && (
              <div
                className={`absolute right-0 mt-2 w-48 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border rounded-lg shadow-lg`}
              >
                <div
                  className={`px-4 py-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <p
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user?.name}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentPage("settings")}
                  className={`w-full flex items-center px-4 py-2 text-left ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    setCurrentPage("login");
                  }}
                  className={`w-full flex items-center px-4 py-2 text-left ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  };

  const Sidebar = () => {
    const menuItems = [
      { id: "dashboard", icon: Home, label: "Home" },
      { id: "new-entry", icon: Plus, label: "New Entry" },
      { id: "slots", icon: Grid3X3, label: "Parking Slots" },
      { id: "requests", icon: Inbox, label: "Requests" },
      { id: "notifications", icon: Bell, label: "Notifications" },
      { id: "settings", icon: Settings, label: "Settings" },
    ];

    return (
      <div
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-r w-64 h-screen fixed left-0 top-0 pt-20 transform transition-transform duration-200 ease-in-out z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <nav className="px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : darkMode
                    ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    );
  };

  const Dashboard = () => {
    const stats = [
      { label: "Total Cars", value: vehicles.length, icon: Car, color: "blue" },
      { label: "Idle Valets", value: 3, icon: Users, color: "green" },
      {
        label: "Available Slots",
        value: parkingSlots.filter((slot) => slot.status === "free").length,
        icon: MapPin,
        color: "purple",
      },
    ];

    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      } mt-2`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div className={`bg-${stat.color}-100 p-3 rounded-xl`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border rounded-xl p-6 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Real-Time Vehicle Status
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  className={`pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <button
                className={`flex items-center px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Guest
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Vehicle
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Slot
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Check-in
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Valet
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className={`border-b ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {vehicle.guestName}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {vehicle.mobile}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {vehicle.vehicleNumber}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {vehicle.type}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {vehicle.slot}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          vehicle.status === "Parked"
                            ? "bg-green-100 text-green-800"
                            : vehicle.status === "In Transit"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-4 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {vehicle.checkIn}
                    </td>
                    <td
                      className={`px-4 py-4 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {vehicle.valet}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const NewEntry = () => {
    const [formData, setFormData] = useState({
      guestName: "",
      mobile: "",
      vehicleNumber: "",
      vehicleType: "Car",
      gender: "",
    });
    const [showQR, setShowQR] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.guestName && formData.mobile && formData.vehicleNumber) {
        setShowQR(true);
        // Add to vehicles list
        const newVehicle = {
          id: vehicles.length + 1,
          ...formData,
          slot: `A${(vehicles.length + 1).toString().padStart(2, "0")}`,
          status: "Parked",
          checkIn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          valet: "Auto Assigned",
        };
        setVehicles([...vehicles, newVehicle]);
      }
    };

    if (showQR) {
      return (
        <div className="p-6 max-w-md mx-auto">
          <div
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border rounded-xl p-8 text-center shadow-lg`}
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-2`}
            >
              Vehicle Registered!
            </h2>
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}
            >
              QR Code generated for {formData.vehicleNumber}
            </p>

            <div
              className={`${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } p-8 rounded-lg mb-6`}
            >
              <QrCode
                className={`h-32 w-32 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } mx-auto`}
              />
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-500" : "text-gray-600"
                } mt-2`}
              >
                QR Code for vehicle pickup
              </p>
            </div>

            <button
              onClick={() => {
                setShowQR(false);
                setFormData({
                  guestName: "",
                  mobile: "",
                  vehicleNumber: "",
                  vehicleType: "Car",
                  gender: "",
                });
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Add Another Vehicle
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border rounded-xl p-8 shadow-sm`}
        >
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-6`}
          >
            New Vehicle Entry
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Guest Name *
                </label>
                <input
                  type="text"
                  value={formData.guestName}
                  onChange={(e) =>
                    setFormData({ ...formData, guestName: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter guest name"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="+91-9876543210"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Vehicle Number *
                </label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleNumber: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="MH01AB1234"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Vehicle Type *
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleType: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="Car">Car</option>
                  <option value="SUV">SUV</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Guest Gender (Optional)
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Generate QR & Register
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    guestName: "",
                    mobile: "",
                    vehicleNumber: "",
                    vehicleType: "Car",
                    gender: "",
                  })
                }
                className={`px-6 py-3 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                } transition-colors`}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ParkingSlots = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [viewMode, setViewMode] = useState("grid");

    const getSlotColor = (status) => {
      switch (status) {
        case "free":
          return "bg-green-100 border-green-300 text-green-800";
        case "occupied":
          return "bg-red-100 border-red-300 text-red-800";
        case "maintenance":
          return "bg-yellow-100 border-yellow-300 text-yellow-800";
        default:
          return "bg-gray-100 border-gray-300 text-gray-800";
      }
    };

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Parking Slot Management
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Free
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Occupied
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Transit
                </span>
              </div>
            </div>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors`}
            >
              {viewMode === "grid" ? "List View" : "Grid View"}
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="space-y-8">
            {["A", "B", "C"].map((section) => (
              <div key={section}>
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-4`}
                >
                  Section {section}
                </h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                  {parkingSlots
                    .filter((slot) => slot.section === section)
                    .map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`aspect-square p-3 rounded-lg border-2 font-medium text-sm transition-all duration-200 hover:scale-105 ${
                          slot.status === "free"
                            ? "bg-green-100 border-green-300 text-green-800 hover:bg-green-200"
                            : "bg-red-100 border-red-300 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {slot.id}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border rounded-xl overflow-hidden shadow-sm`}
          >
            <table className="w-full">
              <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                <tr>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Slot ID
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Section
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Vehicle
                  </th>
                  <th
                    className={`text-left px-4 py-3 text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {parkingSlots.slice(0, 20).map((slot) => (
                  <tr
                    key={slot.id}
                    className={`border-b ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <td
                      className={`px-4 py-3 font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {slot.id}
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Section {slot.section}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slot.status === "free"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {slot.status === "free" ? "Available" : "Occupied"}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {slot.vehicle ? slot.vehicle.vehicleNumber : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedSlot(slot)}
                        className={`flex items-center px-3 py-1 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors`}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-6 max-w-md w-full shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Slot {selectedSlot.id}
                </h3>
                <button
                  onClick={() => setSelectedSlot(null)}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "text-gray-400 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Status
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                      selectedSlot.status === "free"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedSlot.status === "free" ? "Available" : "Occupied"}
                  </span>
                </div>

                {selectedSlot.vehicle && (
                  <>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Vehicle Details
                      </p>
                      <p
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } mt-1`}
                      >
                        {selectedSlot.vehicle.vehicleNumber} (
                        {selectedSlot.vehicle.type})
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Guest
                      </p>
                      <p
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } mt-1`}
                      >
                        {selectedSlot.vehicle.guestName}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const RequestManagement = () => {
    const [filter, setFilter] = useState("all");

    const filteredRequests = requests.filter(
      (request) => filter === "all" || request.status.toLowerCase() === filter
    );

    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "assigned":
          return "bg-blue-100 text-blue-800";
        case "completed":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case "high":
          return "bg-red-100 text-red-800";
        case "medium":
          return "bg-yellow-100 text-yellow-800";
        case "low":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Request Management
          </h2>
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border rounded-xl overflow-hidden shadow-sm`}
        >
          <table className="w-full">
            <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <tr>
                <th
                  className={`text-left px-4 py-3 text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Guest
                </th>
                <th
                  className={`text-left px-4 py-3 text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Vehicle
                </th>
                <th
                  className={`text-left px-4 py-3 text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Slot
                </th>
                <th
                  className={`text-left px-4 py-3 text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Request Time
                </th>
                <th
                  className={`text-left px-4 py-3 text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Priority
                </th>
                <th
                  className={`text-left px-4 py-3 text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`text-left px-4 py-3 text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className={`border-b ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td
                    className={`px-4 py-4 font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {request.guestName}
                  </td>
                  <td
                    className={`px-4 py-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {request.vehicleNumber}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {request.slot}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-4 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {request.requestTime}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        request.priority
                      )}`}
                    >
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {request.status === "Pending" && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Assign Valet
                      </button>
                    )}
                    {request.status === "Assigned" && (
                      <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Mark Complete
                      </button>
                    )}
                    {request.status === "Completed" && (
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Delivered
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const NotificationPanel = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Notifications
          </h2>
          <button
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            Mark All Read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      notification.type === "info"
                        ? "bg-blue-100"
                        : notification.type === "warning"
                        ? "bg-yellow-100"
                        : "bg-green-100"
                    }`}
                  >
                    {notification.type === "info" && (
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                    )}
                    {notification.type === "warning" && (
                      <Clock className="h-5 w-5 text-yellow-600" />
                    )}
                    {notification.type === "success" && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`${
                        darkMode ? "text-white" : "text-gray-900"
                      } font-medium`}
                    >
                      {notification.message}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mt-1`}
                    >
                      {notification.time}
                    </p>
                  </div>
                </div>
                <button
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-600 hover:text-gray-700"
                  }`}
                >
                  Mark Read
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SettingsPage = () => {
    const [autoAssign, setAutoAssign] = useState(true);
    const [language, setLanguage] = useState("en");

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          } mb-6`}
        >
          Settings
        </h2>

        <div className="space-y-6">
          <div
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border rounded-xl p-6 shadow-sm`}
          >
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-4`}
            >
              Profile Information
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>
          </div>

          <div
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border rounded-xl p-6 shadow-sm`}
          >
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-4`}
            >
              System Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Auto-assign Valets
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Automatically assign available valets to new requests
                  </p>
                </div>
                <button
                  onClick={() => setAutoAssign(!autoAssign)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoAssign
                      ? "bg-blue-600"
                      : darkMode
                      ? "bg-gray-600"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoAssign ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Dark Mode
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Switch between light and dark themes
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="gu">ગુજરાતી (Gujarati)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              Save Changes
            </button>
            <button
              className={`px-6 py-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              } transition-colors`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar />
      <Sidebar />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="md:ml-64 pt-20">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "new-entry" && <NewEntry />}
        {currentPage === "slots" && <ParkingSlots />}
        {currentPage === "requests" && <RequestManagement />}
        {currentPage === "notifications" && <NotificationPanel />}
        {currentPage === "settings" && <SettingsPage />}
      </main>
    </div>
  );
};

export default SparkeeApp;
