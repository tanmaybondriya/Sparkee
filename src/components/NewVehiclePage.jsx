import React from "react";
import { QrCode } from "lucide-react";

const NewVehiclePage = ({
  newVehicle,
  setNewVehicle,
  handleNewVehicleSubmit,
  setCurrentPage,
}) => (
  <div className="max-w-2xl mx-auto px-4">
    <div className="bg-blue rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">New Vehicle Check-In</h2>
        <p className="text-white-600 mt-1">Enter vehicle and guest details</p>
      </div>
      <form onSubmit={handleNewVehicleSubmit} className="p-6 space-y-6">
        {/* Guest Name & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white-700 mb-2">
              Guest Name *
            </label>
            <input
              type="text"
              required
              value={newVehicle.guestName}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, guestName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter guest name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white -700 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              required
              value={newVehicle.mobile}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, mobile: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+91 9876543210"
            />
          </div>
        </div>

        {/* Vehicle Number */}
        <div>
          <label className="block text-sm font-medium text-white-700 mb-2">
            Vehicle Number *
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              required
              value={newVehicle.vehicleNo}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, vehicleNo: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MH12AB1234"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue text-white rounded-lg hover:bg-white hover:text-black transition-colors"
              onClick={() => alert("OCR functionality not implemented yet")}
              title="Optical Character Recognition (OCR) for Vehicle Number"
              aria-label="OCR for Vehicle Number"
              disabled
            >
              📷 OCR
            </button>
          </div>
        </div>

        {/* Vehicle Type (Radio Buttons) */}
        <div>
          <label className="block text-sm font-medium text-white-700 mb-2">
            Vehicle Type *
          </label>
          <div className="flex flex-wrap gap-4">
            {["Bike", "Car", "Truck"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="vehicleType"
                  value={type}
                  checked={newVehicle.vehicleType === type}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      vehicleType: e.target.value,
                    })
                  }
                  className="form-radio text-blue-500"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Guest Gender (Radio Buttons) */}
        <div>
          <label className="block text-sm font-medium text-white-700 mb-2">
            Guest Gender
          </label>
          <div className="flex flex-wrap gap-4">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="guestGender"
                  value={gender}
                  checked={newVehicle.gender === gender}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, gender: e.target.value })
                  }
                  className="form-radio text-blue-500"
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <QrCode className="w-5 h-5" />
            <span>Generate QR & Check-In</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("dashboard")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default NewVehiclePage;
