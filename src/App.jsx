import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import NewVehiclePage from "./components/NewVehiclePage";
import ParkingSlotsPage from "./components/ParkingSlotsPage";
import RequestsPage from "./components/RequestsPage";
import UserDetailsPage from "./components/UserDetailsPage";
import QRModal from "./components/QRModal";
import AnalyticsDashboard from "./components/Analytics";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNo: "MH12AB1234",
      type: "Car",
      guestName: "John Doe",
      mobile: "+91 9876543210",
      status: "Parked",
      valet: "Raj Kumar",
      timeIn: "10:30 AM",
      slot: "A-15",
      qrCode: "QR001",
    },
    {
      id: 2,
      vehicleNo: "MH14CD5678",
      type: "SUV",
      guestName: "Sarah Wilson",
      mobile: "+91 9123456789",
      status: "In Transit",
      valet: "Amit Singh",
      timeIn: "11:15 AM",
      slot: "B-08",
      qrCode: "QR002",
    },
    {
      id: 3,
      vehicleNo: "MH16EF9012",
      type: "Bike",
      guestName: "Mike Johnson",
      mobile: "+91 9998887776",
      status: "Requested",
      valet: "Priya Sharma",
      timeIn: "09:45 AM",
      slot: "C-22",
      qrCode: "QR003",
    },
  ]);

  const [valetStaff] = useState([
    { id: 1, name: "Raj Kumar", status: "Available", vehiclesHandled: 12 },
    { id: 2, name: "Amit Singh", status: "Busy", vehiclesHandled: 8 },
    { id: 3, name: "Priya Sharma", status: "Available", vehiclesHandled: 15 },
    { id: 4, name: "Deepak Patel", status: "Available", vehiclesHandled: 10 },
  ]);

  const [parkingSlots] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      number: `${String.fromCharCode(65 + Math.floor(i / 10))}-${String(
        (i % 10) + 1
      ).padStart(2, "0")}`,
      occupied: Math.random() > 0.6,
      vehicleType:
        Math.random() > 0.5 ? "Car" : Math.random() > 0.5 ? "SUV" : "Bike",
      vehicleNo:
        Math.random() > 0.6
          ? `MH${Math.floor(Math.random() * 99)}AB${Math.floor(
              Math.random() * 9999
            )}`
          : null,
    }))
  );

  const [notifications] = useState([
    {
      id: 1,
      type: "request",
      message: "Vehicle MH16EF9012 requested for pickup",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "checkin",
      message: "New vehicle MH18GH3456 checked in",
      time: "5 min ago",
    },
    {
      id: 3,
      type: "delivered",
      message: "Vehicle MH20IJ7890 delivered successfully",
      time: "8 min ago",
    },
  ]);

  const [userRequests] = useState([
    {
      id: 1,
      guestName: "Rahul Sharma",
      mobile: "+91 9876543210",
      vehicleNo: "MH12AB1234",
      vehicleType: "Car",
      gender: "Male",
      checkInTime: "2024-01-15T10:30:00",
      checkOutRequestedTime: "2024-01-15T14:45:00",
      parkingSlot: "B-15",
      approximateRetrievalTime: 180,
      assignedValet: "Raj Kumar",
      currentStatus: "Moving",
    },
    {
      id: 2,
      guestName: "Priya Patel",
      mobile: "+91 9123456789",
      vehicleNo: "MH14CD5678",
      vehicleType: "SUV",
      gender: "Female",
      checkInTime: "2024-01-15T11:15:00",
      checkOutRequestedTime: "2024-01-15T15:20:00",
      parkingSlot: "A-08",
      approximateRetrievalTime: 120,
      assignedValet: "Amit Singh",
      currentStatus: "Ready for Pickup",
    },
    {
      id: 3,
      guestName: "Mike Johnson",
      mobile: "+91 9998887776",
      vehicleNo: "MH16EF9012",
      vehicleType: "Bike",
      gender: "Male",
      checkInTime: "2024-01-15T09:45:00",
      checkOutRequestedTime: "2024-01-15T15:30:00",
      parkingSlot: "C-22",
      approximateRetrievalTime: 300,
      assignedValet: "Priya Sharma",
      currentStatus: "Queued",
    },
    {
      id: 4,
      guestName: "Anita Desai",
      mobile: "+91 9555666777",
      vehicleNo: "MH18GH3456",
      vehicleType: "Car",
      gender: "Female",
      checkInTime: "2024-01-15T12:00:00",
      checkOutRequestedTime: "2024-01-15T15:35:00",
      parkingSlot: "D-05",
      approximateRetrievalTime: 450,
      assignedValet: "Deepak Patel",
      currentStatus: "Delayed",
    },
  ]);

  const [newVehicle, setNewVehicle] = useState({
    guestName: "",
    mobile: "",
    vehicleNo: "",
    vehicleType: "Car",
    gender: "Male",
  });

  const [showQRModal, setShowQRModal] = useState(false);
  const [generatedQR, setGeneratedQR] = useState("");

  const handleNewVehicleSubmit = (e) => {
    e.preventDefault();
    const qrCode = `QR${String(Date.now()).slice(-6)}`;
    const newVehicleEntry = {
      id: vehicles.length + 1,
      ...newVehicle,
      status: "In Transit",
      valet: "Assigning...",
      timeIn: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      slot: "Assigning...",
      qrCode,
    };
    setVehicles([...vehicles, newVehicleEntry]);
    setGeneratedQR(qrCode);
    setShowQRModal(true);
    setNewVehicle({
      guestName: "",
      mobile: "",
      vehicleNo: "",
      vehicleType: "Car",
      gender: "Male",
    });
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <Sidebar vehicles={vehicles} valetStaff={valetStaff} />
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            notifications={notifications}
            toggleTheme={toggleTheme}
            theme={theme}
          />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    vehicles={vehicles}
                    parkingSlots={parkingSlots}
                    valetStaff={valetStaff}
                  />
                }
              />
              <Route
                path="/new-vehicle"
                element={
                  <NewVehiclePage
                    newVehicle={newVehicle}
                    setNewVehicle={setNewVehicle}
                    handleNewVehicleSubmit={handleNewVehicleSubmit}
                  />
                }
              />
              <Route
                path="/slots"
                element={<ParkingSlotsPage parkingSlots={parkingSlots} />}
              />
              <Route
                path="/requests"
                element={
                  <RequestsPage vehicles={vehicles} valetStaff={valetStaff} />
                }
              />
              <Route
                path="/user-details"
                element={<UserDetailsPage userRequests={userRequests} />}
              />
              <Route path="/Analytics" element={<AnalyticsDashboard />} />
            </Routes>
          </main>
        </div>
        {/* QRModal */}
        <QRModal
          showQRModal={showQRModal}
          setShowQRModal={setShowQRModal}
          generatedQR={generatedQR}
        />
      </div>
    </Router>
  );
};

export default App;
