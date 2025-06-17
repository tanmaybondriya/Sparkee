import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  MapPin,
  Users,
  Bell,
  Plus,
  Grid3x3,
  Search,
  Filter,
  Eye,
  CheckCircle,
  BarChart2,
} from "lucide-react";
import getVehicleIcon from "../utils/getVehicleIcon";
import getStatusColor from "../utils/getStatusColor";

const Dashboard = ({
  vehicles,
  parkingSlots,
  valetStaff,
  updateVehicleStatus,
}) => {
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filter vehicles based on search and status
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.guestName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle "Mark as Complete" action
  const handleMarkAsComplete = (id) => {
    updateVehicleStatus(id, "Delivered");
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Vehicles
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {vehicles.length}
              </p>
            </div>
            <Car className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Occupied Slots
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {parkingSlots.filter((s) => s.occupied).length}/50
              </p>
            </div>
            <MapPin className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active Valets
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {valetStaff.filter((v) => v.status === "Available").length}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pending Requests
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {vehicles.filter((v) => v.status === "Requested").length}
              </p>
            </div>
            <Bell className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/new-vehicle"
            className="flex items-center justify-center space-x-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Check-In</span>
          </Link>
          <Link
            to="/slots"
            className="flex items-center justify-center space-x-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Grid3x3 className="w-5 h-5" />
            <span>View Slots</span>
          </Link>
          <Link
            to="/requests"
            className="flex items-center justify-center space-x-2 bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span>Manage Requests</span>
          </Link>
        </div>
      </div>

      {/* Active Vehicles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Active Vehicles
            </h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  aria-label="Filter vehicles"
                >
                  <Filter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      {[
                        "All",
                        "Parked",
                        "In Transit",
                        "Requested",
                        "Delivered",
                      ].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            setShowFilterDropdown(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            statusFilter === status
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Vehicle
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Guest
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Valet
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Time In
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Slot
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {getVehicleIcon(vehicle.type)}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {vehicle.vehicleNo}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {vehicle.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {vehicle.guestName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {vehicle.mobile}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        vehicle.status
                      )}`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {vehicle.valet}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {vehicle.timeIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {vehicle.slot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/vehicle/${vehicle.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                      aria-label={`View details for vehicle ${vehicle.vehicleNo}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleMarkAsComplete(vehicle.id)}
                      className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                      aria-label={`Mark vehicle ${vehicle.vehicleNo} as complete`}
                      disabled={vehicle.status === "Delivered"}
                    >
                      <CheckCircle
                        className={`w-4 h-4 ${
                          vehicle.status === "Delivered"
                            ? "text-gray-400 dark:text-gray-500"
                            : ""
                        }`}
                      />
                    </button>
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

export default Dashboard;
