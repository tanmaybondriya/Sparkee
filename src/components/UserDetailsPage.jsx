import React, { useState } from "react";
import {
  Search,
  Filter,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import getVehicleIcon from "../utils/getVehicleIcon";
import userRequests from "../data/userRequests"; // Import the mock data

const UserDetailsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [expandedRequestId, setExpandedRequestId] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ready for Pickup":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700";
      case "Queued":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700";
      case "Moving":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700";
      case "Delayed":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRetrievalTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  };

  const filteredRequests = userRequests
    .filter(
      (request) =>
        request.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.mobile.includes(searchTerm) ||
        request.guestName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "latest") {
        return (
          new Date(b.checkOutRequestedTime) - new Date(a.checkOutRequestedTime)
        );
      } else if (sortBy === "retrievalTime") {
        return a.approximateRetrievalTime - b.approximateRetrievalTime;
      }
      return 0;
    });

  const toggleExpand = (id) => {
    setExpandedRequestId(expandedRequestId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                User Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage missed call retrieval requests
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by vehicle number or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="latest">Latest Calls</option>
                <option value="retrievalTime">Retrieval Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <Phone className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No missed call requests found
              </p>
            </div>
          ) : (
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
                      Mobile
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
                      Slot
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Retrieval Time
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
                  {filteredRequests.map((request) => (
                    <React.Fragment key={request.id}>
                      <tr
                        onClick={() => toggleExpand(request.id)}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        aria-expanded={expandedRequestId === request.id}
                        aria-controls={`details-${request.id}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">
                              {getVehicleIcon(request.vehicleType)}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {request.vehicleNo}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {request.vehicleType}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {request.guestName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {request.mobile}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              request.currentStatus
                            )}`}
                          >
                            {request.currentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {request.parkingSlot}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {formatRetrievalTime(
                            request.approximateRetrievalTime
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {expandedRequestId === request.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </td>
                      </tr>
                      {expandedRequestId === request.id && (
                        <tr id={`details-${request.id}`}>
                          <td colSpan="7" className="px-6 py-4">
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Guest Details
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Name: {request.guestName}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Mobile: {request.mobile}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Gender: {request.gender}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Vehicle Details
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Vehicle Number: {request.vehicleNo}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Type: {request.vehicleType}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Slot: {request.parkingSlot}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Timing Details
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Check-in: {formatTime(request.checkInTime)}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Missed Call:{" "}
                                    {formatTime(request.checkOutRequestedTime)}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Retrieval Time:{" "}
                                    {formatRetrievalTime(
                                      request.approximateRetrievalTime
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Valet Details
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Assigned Valet: {request.assignedValet}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Status: {request.currentStatus}
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2 pt-4">
                                <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>Notify User</span>
                                </button>
                                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                                  Update
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
