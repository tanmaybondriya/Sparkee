const getVehicleIcon = (type) => {
  switch (type) {
    case "Bike":
      return "🏍️";
    case "Car":
      return "🚗";
    case "SUV":
      return "🚙";
    case "Truck":
      return "🚚";
    default:
      return "🚗";
  }
};

export default getVehicleIcon;
