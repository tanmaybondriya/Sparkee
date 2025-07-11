const userRequests = [
  {
    id: "1",
    vehicleNo: "MH12AB1234",
    vehicleType: "Car",
    guestName: "John Doe",
    mobile: "+919876543210",
    gender: "Male",
    parkingSlot: "A-12",
    approximateRetrievalTime: 300, // in seconds
    currentStatus: "Ready for Pickup",
    checkInTime: "2025-06-16T14:30:00",
    checkOutRequestedTime: "2025-06-16T16:45:00",
    assignedValet: "Valet 1",
  },
  {
    id: "2",
    vehicleNo: "KA05CD5678",
    vehicleType: "Bike",
    guestName: "Jane Smith",
    mobile: "+919123456789",
    gender: "Female",
    parkingSlot: "B-05",
    approximateRetrievalTime: 180,
    currentStatus: "Queued",
    checkInTime: "2025-06-16T15:00:00",
    checkOutRequestedTime: "2025-06-16T16:50:00",
    assignedValet: "Valet 2",
  },
  {
    id: "3",
    vehicleNo: "TN07EF9012",
    vehicleType: "Car",
    guestName: "Alice Brown",
    mobile: "+919555123456",
    gender: "Female",
    parkingSlot: "C-03",
    approximateRetrievalTime: 600,
    currentStatus: "Delayed",
    checkInTime: "2025-06-16T13:00:00",
    checkOutRequestedTime: "2025-06-16T16:55:00",
    assignedValet: "Valet 3",
  },
  {
    id: "4",
    vehicleNo: "DL09GH3456",
    vehicleType: "Bike",
    guestName: "Bob Wilson",
    mobile: "+919444987654",
    gender: "Male",
    parkingSlot: "D-08",
    approximateRetrievalTime: 120,
    currentStatus: "Moving",
    checkInTime: "2025-06-16T15:30:00",
    checkOutRequestedTime: "2025-06-16T17:00:00",
    assignedValet: "Valet 4",
  },
];

export default userRequests;
