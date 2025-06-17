const getStatusColor = (status) => {
  switch (status) {
    case "Parked":
      return "bg-green-100 text-green-800";
    case "In Transit":
      return "bg-yellow-100 text-yellow-800";
    case "Requested":
      return "bg-blue-100 text-blue-800";
    case "Being Delivered":
      return "bg-purple-100 text-purple-800";
    case "Completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default getStatusColor;
