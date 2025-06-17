import React from "react";
import { Bell } from "lucide-react";
import getVehicleIcon from "../utils/getVehicleIcon";

const RequestsPage = ({ vehicles, valetStaff }) => (
  <div className="space-y-6">
    <div className="bg-blue rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Pickup Requests</h2>
        <p className="text-gray-600 mt-1">Manage vehicle pickup requests</p>
      </div>
      <div className="p-6">
        {vehicles
          .filter((v) => v.status === "Requested")
          .map((vehicle) => (
            <div
              key={vehicle.id}
              className="border rounded-lg p-4 mb-4 bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">
                    {getVehicleIcon(vehicle.type)}
                  </span>
                  <div>
                    <h3 className="font-semibold">{vehicle.vehicleNo}</h3>
                    <p className="text-sm text-gray-600">
                      {vehicle.guestName} • {vehicle.mobile}
                    </p>
                    <p className="text-sm text-gray-500">
                      Slot: {vehicle.slot} • Parked: {vehicle.timeIn}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-1 border rounded text-sm">
                    <option>Select Valet</option>
                    {valetStaff
                      .filter((v) => v.status === "Available")
                      .map((valet) => (
                        <option key={valet.id} value={valet.name}>
                          {valet.name}
                        </option>
                      ))}
                  </select>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm">
                    Assign & Deliver
                  </button>
                </div>
              </div>
            </div>
          ))}
        {vehicles.filter((v) => v.status === "Requested").length === 0 && (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No pending pickup requests</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default RequestsPage;
