import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: [true, 'Vehicle number is required'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/, 'Please enter a valid vehicle number']
  },
  type: {
    type: String,
    required: [true, 'Vehicle type is required'],
    enum: ['Car', 'Bike', 'SUV', 'Truck'],
    default: 'Car'
  },
  guestName: {
    type: String,
    required: [true, 'Guest name is required'],
    trim: true,
    minlength: [2, 'Guest name must be at least 2 characters'],
    maxlength: [50, 'Guest name cannot exceed 50 characters']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^\+91[0-9]{10}$/, 'Please enter a valid mobile number with +91']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  status: {
    type: String,
    enum: ['Parked', 'In Transit', 'Requested', 'Being Delivered', 'Completed'],
    default: 'In Transit'
  },
  valet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Valet',
    default: null
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingSlot',
    default: null
  },
  qrCode: {
    type: String,
    unique: true,
    required: true
  },
  timeIn: {
    type: Date,
    default: Date.now
  },
  timeOut: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for parking duration
vehicleSchema.virtual('parkingDuration').get(function() {
  const endTime = this.timeOut || new Date();
  return Math.floor((endTime - this.timeIn) / (1000 * 60)); // Duration in minutes
});

// Index for better query performance
vehicleSchema.index({ vehicleNo: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ timeIn: -1 });

export default mongoose.model('Vehicle', vehicleSchema);