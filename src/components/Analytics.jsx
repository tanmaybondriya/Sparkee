import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Clock,
  Users,
  Star,
  Download,
  Calendar,
  Settings,
  AlertTriangle,
} from "lucide-react";

const AnalyticsDashboard = () => {
  const dailyRevenueData = [
    { day: "Mon", revenue: 8500 },
    { day: "Tue", revenue: 12000 },
    { day: "Wed", revenue: 9800 },
    { day: "Thu", revenue: 15000 },
    { day: "Fri", revenue: 13500 },
    { day: "Sat", revenue: 11200 },
    { day: "Sun", revenue: 7800 },
  ];

  const vehicleTypeData = [
    { name: "Cars", value: 70, color: "#3B82F6" }, // Blue
    { name: "Bikes", value: 20, color: "#10B981" }, // Green
    { name: "SUVs", value: 10, color: "#F59E0B" }, // Yellow
  ];

  const topIssues = [
    { issue: "Long wait times", count: 23, trend: "up" },
    { issue: "Slot unavailability", count: 18, trend: "down" },
    { issue: "Communication gaps", count: 12, trend: "up" },
  ];

  const formatCurrency = (value) => `₹${(value / 1000).toFixed(0)}K`;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-blue rounded-lg shadow-sm border border-gray-500">
        <div className="p-6 border-b border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>📊</span>
                <span>Analytics & Reports</span>
              </h2>
              <p className="text-gray-300 mt-1">
                System-wide performance insights and metrics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2 border border-gray-500 bg-blue text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Period: Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Last Year</option>
              </select>
              <button className="px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue p-6 rounded-lg shadow-sm border border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Revenue</p>
              <p className="text-2xl font-bold text-white">₹87,340</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400 font-medium">
                  ↑ 15%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-blue p-6 rounded-lg shadow-sm border border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Avg Duration</p>
              <p className="text-2xl font-bold text-white">2.5 hrs</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-blue-200 font-medium">
                  ↓ 0.3 hrs
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-200" />
            </div>
          </div>
        </div>

        <div className="bg-blue p-6 rounded-lg shadow-sm border border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Peak Hours</p>
              <p className="text-2xl font-bold text-white">2–4 PM</p>
              <p className="text-sm text-gray-400 mt-2">Highest traffic</p>
            </div>
            <div className="w-12 h-12 bg-blue rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-200" />
            </div>
          </div>
        </div>

        <div className="bg-blue p-6 rounded-lg shadow-sm border border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-white flex items-center">
                4.8/5.0 <span className="ml-1">⭐</span>
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-green-400 font-medium">
                  ↑ 0.2
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Trend Chart */}
        <div className="bg-blue rounded-lg shadow-sm border border-gray-500">
          <div className="p-6 border-b border-gray-500">
            <h3 className="text-lg font-semibold text-white">
              Daily Revenue Trend
            </h3>
            <p className="text-sm text-gray-300">
              Revenue performance over the week
            </p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#93c5fd" />
                <XAxis dataKey="day" stroke="#bfdbfe" fontSize={12} />
                <YAxis
                  stroke="#bfdbfe"
                  fontSize={12}
                  tickFormatter={formatCurrency} // Format Y-axis labels
                />
                <Tooltip
                  formatter={(value) => [
                    `₹${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  labelStyle={{ color: "#ffffff" }}
                  contentStyle={{
                    backgroundColor: "#1e40af",
                    border: "1px solid #6b7280",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#93c5fd"
                  strokeWidth={3}
                  dot={{ fill: "#93c5fd", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#93c5fd", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Type Distribution Chart */}
        <div className="bg-blue rounded-lg shadow-sm border border-gray-500">
          <div className="p-6 border-b border-gray-500">
            <h3 className="text-lg font-semibold text-white">
              Vehicle Type Distribution
            </h3>
            <p className="text-sm text-gray-300">
              Breakdown by vehicle categories
            </p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Percentage"]}
                  contentStyle={{
                    backgroundColor: "#1e40af",
                    border: "1px solid #6b7280",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#ffffff" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {vehicleTypeData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-300">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Issues Section */}
      <div className="bg-blue rounded-lg shadow-sm border border-gray-500">
        <div className="p-6 border-b border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Top Issues</h3>
              <p className="text-sm text-gray-300">
                Most reported problems this week
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 text-sm border border-gray-500 text-white bg-blue rounded-lg hover:bg-blue transition-colors flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Schedule Reports</span>
              </button>
              <button className="px-3 py-2 text-sm border border-gray-500 text-white bg-blue rounded-lg hover:bg-blue transition-colors flex items-center space-x-1">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topIssues.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-blue rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-300" />
                  <div>
                    <p className="font-medium text-white">{item.issue}</p>
                    <p className="text-sm text-gray-300">
                      {item.count} reports
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-medium ${
                      item.trend === "up" ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {item.trend === "up" ? "↑" : "↓"}
                  </span>
                  <span className="text-sm text-gray-400">vs last week</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
