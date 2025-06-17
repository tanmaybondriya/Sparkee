import mongoose from 'mongoose';

const valetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Valet name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^\+91[0-9]{10}$/, 'Please enter a valid mobile number with +91']
  },
  status: {
    type: String,
    enum: ['Available', 'Busy', 'Off Duty'],
    default: 'Available'
  },
  vehiclesHandled: {
    type: Number,
    default: 0,
    min: 0
  },
  currentVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    default: null
  },
  shift: {
    type: String,
    enum: ['Morning', 'Evening', 'Night'],
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
valetSchema.index({ status: 1 });
valetSchema.index({ employeeId: 1 });

export default mongoose.model('Valet', valetSchema);