import express from 'express';
import ParkingSlot from '../models/ParkingSlot.js';
import { validateSlot } from '../validators/slotValidator.js';

const router = express.Router();

// GET /api/slots - Get all parking slots
router.get('/', async (req, res) => {
  try {
    const { section, floor, occupied, vehicleType, page = 1, limit = 50 } = req.query;
    
    let query = { isActive: true };
    if (section) query.section = section;
    if (floor !== undefined) query.floor = parseInt(floor);
    if (occupied !== undefined) query.occupied = occupied === 'true';
    if (vehicleType) query.vehicleType = vehicleType;

    const slots = await ParkingSlot.find(query)
      .populate('currentVehicle', 'vehicleNo type guestName timeIn')
      .sort({ section: 1, number: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ParkingSlot.countDocuments(query);

    // Get summary statistics
    const summary = await ParkingSlot.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalSlots: { $sum: 1 },
          occupiedSlots: { $sum: { $cond: ['$occupied', 1, 0] } },
          availableSlots: { $sum: { $cond: ['$occupied', 0, 1] } }
        }
      }
    ]);

    res.json({
      success: true,
      data: slots,
      summary: summary[0] || { totalSlots: 0, occupiedSlots: 0, availableSlots: 0 },
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching parking slots',
      error: error.message
    });
  }
});

// GET /api/slots/:id - Get specific slot
router.get('/:id', async (req, res) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id)
      .populate('currentVehicle', 'vehicleNo type guestName mobile timeIn');

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Parking slot not found'
      });
    }

    res.json({
      success: true,
      data: slot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching parking slot',
      error: error.message
    });
  }
});

// POST /api/slots - Add new parking slot
router.post('/', validateSlot, async (req, res) => {
  try {
    const slot = new ParkingSlot(req.body);
    await slot.save();

    res.status(201).json({
      success: true,
      message: 'Parking slot added successfully',
      data: slot
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Slot number already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error adding parking slot',
      error: error.message
    });
  }
});

// PUT /api/slots/:id - Update parking slot
router.put('/:id', async (req, res) => {
  try {
    const slot = await ParkingSlot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Parking slot not found'
      });
    }

    res.json({
      success: true,
      message: 'Parking slot updated successfully',
      data: slot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating parking slot',
      error: error.message
    });
  }
});

// DELETE /api/slots/:id - Deactivate parking slot
router.delete('/:id', async (req, res) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id);
    
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Parking slot not found'
      });
    }

    if (slot.occupied) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate occupied parking slot'
      });
    }

    slot.isActive = false;
    await slot.save();

    res.json({
      success: true,
      message: 'Parking slot deactivated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deactivating parking slot',
      error: error.message
    });
  }
});

// GET /api/slots/available/:vehicleType - Get available slots for vehicle type
router.get('/available/:vehicleType', async (req, res) => {
  try {
    const { vehicleType } = req.params;
    
    const availableSlots = await ParkingSlot.find({
      occupied: false,
      isActive: true,
      $or: [
        { vehicleType: vehicleType },
        { vehicleType: 'Any' }
      ]
    }).sort({ section: 1, number: 1 });

    res.json({
      success: true,
      data: availableSlots,
      count: availableSlots.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching available slots',
      error: error.message
    });
  }
});

export default router;