import express from 'express';
import Vehicle from '../models/Vehicle.js';
import ParkingSlot from '../models/ParkingSlot.js';
import Valet from '../models/Valet.js';
import User from '../models/User.js';
import { validateVehicle, validateVehicleUpdate } from '../validators/vehicleValidator.js';
import { generateQRCode } from '../utils/qrGenerator.js';

const router = express.Router();

// GET /api/vehicles - Get all vehicles
router.get('/', async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10, search } = req.query;
    
    // Build query
    let query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { vehicleNo: { $regex: search, $options: 'i' } },
        { guestName: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } }
      ];
    }

    const vehicles = await Vehicle.find(query)
      .populate('valet', 'name employeeId')
      .populate('slot', 'number section floor')
      .sort({ timeIn: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Vehicle.countDocuments(query);

    res.json({
      success: true,
      data: vehicles,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicles',
      error: error.message
    });
  }
});

// GET /api/vehicles/:id - Get specific vehicle
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('valet', 'name employeeId mobile')
      .populate('slot', 'number section floor');

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicle',
      error: error.message
    });
  }
});

// POST /api/vehicles - Add new vehicle check-in
router.post('/', validateVehicle, async (req, res) => {
  try {
    const { vehicleNo, type, guestName, mobile, gender, notes } = req.body;

    // Check if vehicle already exists and is not completed
    const existingVehicle = await Vehicle.findOne({
      vehicleNo,
      status: { $ne: 'Completed' }
    });

    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle is already checked in'
      });
    }

    // Generate QR code
    const qrCode = generateQRCode();

    // Find available parking slot
    const availableSlot = await ParkingSlot.findOne({
      occupied: false,
      isActive: true,
      $or: [
        { vehicleType: type },
        { vehicleType: 'Any' }
      ]
    });

    // Find available valet
    const availableValet = await Valet.findOne({
      status: 'Available',
      isActive: true
    });

    // Create vehicle entry
    const vehicle = new Vehicle({
      vehicleNo,
      type,
      guestName,
      mobile,
      gender,
      qrCode,
      notes,
      slot: availableSlot?._id,
      valet: availableValet?._id,
      status: availableSlot ? 'Parked' : 'In Transit'
    });

    await vehicle.save();

    // Update slot if assigned
    if (availableSlot) {
      availableSlot.occupied = true;
      availableSlot.currentVehicle = vehicle._id;
      await availableSlot.save();
    }

    // Update valet if assigned
    if (availableValet) {
      availableValet.status = 'Busy';
      availableValet.currentVehicle = vehicle._id;
      availableValet.vehiclesHandled += 1;
      await availableValet.save();
    }

    // Update or create user record
    let user = await User.findOne({ mobile });
    if (user) {
      user.visitHistory.push({
        vehicleNo,
        vehicleType: type,
        checkInTime: vehicle.timeIn,
        parkingSlot: availableSlot?.number,
        valet: availableValet?.name,
        qrCode
      });
      user.totalVisits += 1;
      await user.save();
    } else {
      user = new User({
        guestName,
        mobile,
        gender,
        visitHistory: [{
          vehicleNo,
          vehicleType: type,
          checkInTime: vehicle.timeIn,
          parkingSlot: availableSlot?.number,
          valet: availableValet?.name,
          qrCode
        }],
        totalVisits: 1
      });
      await user.save();
    }

    // Populate and return
    await vehicle.populate('valet', 'name employeeId');
    await vehicle.populate('slot', 'number section floor');

    res.status(201).json({
      success: true,
      message: 'Vehicle checked in successfully',
      data: vehicle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking in vehicle',
      error: error.message
    });
  }
});

// PUT /api/vehicles/:id - Update vehicle
router.put('/:id', validateVehicleUpdate, async (req, res) => {
  try {
    const { status, valetId, slotId, notes } = req.body;
    
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Handle status changes
    if (status && status !== vehicle.status) {
      // If completing checkout
      if (status === 'Completed') {
        vehicle.timeOut = new Date();
        
        // Free up the slot
        if (vehicle.slot) {
          await ParkingSlot.findByIdAndUpdate(vehicle.slot, {
            occupied: false,
            currentVehicle: null
          });
        }

        // Free up the valet
        if (vehicle.valet) {
          await Valet.findByIdAndUpdate(vehicle.valet, {
            status: 'Available',
            currentVehicle: null
          });
        }

        // Update user visit history
        await User.updateOne(
          { mobile: vehicle.mobile, 'visitHistory.qrCode': vehicle.qrCode },
          { $set: { 'visitHistory.$.checkOutTime': new Date() } }
        );
      }
      
      vehicle.status = status;
    }

    // Handle valet assignment
    if (valetId && valetId !== vehicle.valet?.toString()) {
      // Free previous valet
      if (vehicle.valet) {
        await Valet.findByIdAndUpdate(vehicle.valet, {
          status: 'Available',
          currentVehicle: null
        });
      }

      // Assign new valet
      const newValet = await Valet.findById(valetId);
      if (newValet) {
        newValet.status = 'Busy';
        newValet.currentVehicle = vehicle._id;
        await newValet.save();
        vehicle.valet = valetId;
      }
    }

    // Handle slot assignment
    if (slotId && slotId !== vehicle.slot?.toString()) {
      // Free previous slot
      if (vehicle.slot) {
        await ParkingSlot.findByIdAndUpdate(vehicle.slot, {
          occupied: false,
          currentVehicle: null
        });
      }

      // Assign new slot
      const newSlot = await ParkingSlot.findById(slotId);
      if (newSlot && !newSlot.occupied) {
        newSlot.occupied = true;
        newSlot.currentVehicle = vehicle._id;
        await newSlot.save();
        vehicle.slot = slotId;
      }
    }

    if (notes !== undefined) vehicle.notes = notes;

    await vehicle.save();
    await vehicle.populate('valet', 'name employeeId');
    await vehicle.populate('slot', 'number section floor');

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating vehicle',
      error: error.message
    });
  }
});

// DELETE /api/vehicles/:id - Remove vehicle (checkout)
router.delete('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Free up resources
    if (vehicle.slot) {
      await ParkingSlot.findByIdAndUpdate(vehicle.slot, {
        occupied: false,
        currentVehicle: null
      });
    }

    if (vehicle.valet) {
      await Valet.findByIdAndUpdate(vehicle.valet, {
        status: 'Available',
        currentVehicle: null
      });
    }

    // Update user visit history
    await User.updateOne(
      { mobile: vehicle.mobile, 'visitHistory.qrCode': vehicle.qrCode },
      { $set: { 'visitHistory.$.checkOutTime': new Date() } }
    );

    await Vehicle.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Vehicle checked out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking out vehicle',
      error: error.message
    });
  }
});

export default router;