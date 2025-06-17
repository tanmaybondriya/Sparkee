import mongoose from 'mongoose';

const parkingSlotSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Slot number is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    enum: ['A', 'B', 'C', 'D', 'E'],
    uppercase: true
  },
  floor: {
    type: Number,
    required: [true, 'Floor is required'],
    min: 0,
    max: 10,
    default: 0
  },
  vehicleType: {
    type: String,
    enum: ['Car', 'Bike', 'SUV', 'Truck', 'Any'],
    default: 'Any'
  },
  occupied: {
    type: Boolean,
    default: false
  },
  currentVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  coordinates: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
parkingSlotSchema.index({ occupied: 1 });
parkingSlotSchema.index({ section: 1, floor: 1 });
parkingSlotSchema.index({ vehicleType: 1 });

export default mongoose.model('ParkingSlot', parkingSlotSchema);