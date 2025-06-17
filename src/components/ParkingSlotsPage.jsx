import React from "react";
import getVehicleIcon from "../utils/getVehicleIcon";

const ParkingSlotsPage = ({ parkingSlots }) => (
  <div className="space-y-6">
    <div className="bg-blue rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Parking Slots</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Occupied</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-10 gap-2">
          {parkingSlots.map((slot) => (
            <div
              key={slot.id}
              className={`aspect-square border-2 rounded-lg p-2 text-xs font-medium flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                slot.occupied
                  ? "bg-red-100 border-red-300 text-red-800"
                  : "bg-green-100 border-green-300 text-green-800"
              }`}
            >
              <div className="font-bold">{slot.number}</div>
              {slot.occupied && (
                <div className="text-center">
                  <div className="text-xs">
                    {getVehicleIcon(slot.vehicleType)}
                  </div>
                  <div className="text-xs mt-1 leading-none">
                    {slot.vehicleNo?.slice(-4)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ParkingSlotsPage;
