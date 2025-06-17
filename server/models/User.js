import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: [true, 'Guest name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [/^\+91[0-9]{10}$/, 'Please enter a valid mobile number with +91']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  visitHistory: [{
    vehicleNo: String,
    vehicleType: String,
    checkInTime: { type: Date, default: Date.now },
    checkOutTime: Date,
    parkingSlot: String,
    valet: String,
    qrCode: String
  }],
  totalVisits: {
    type: Number,
    default: 0
  },
  isVIP: {
    type: Boolean,
    default: false
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

// Index for better query performance
userSchema.index({ mobile: 1 });
userSchema.index({ email: 1 });

export default mongoose.model('User', userSchema);