import express from 'express';
import Valet from '../models/Valet.js';
import Vehicle from '../models/Vehicle.js';
import { validateValet } from '../validators/valetValidator.js';

const router = express.Router();

// GET /api/valets - Get all valets
router.get('/', async (req, res) => {
  try {
    const { status, shift, page = 1, limit = 10 } = req.query;
    
    let query = { isActive: true };
    if (status) query.status = status;
    if (shift) query.shift = shift;

    const valets = await Valet.find(query)
      .populate('currentVehicle', 'vehicleNo guestName')
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Valet.countDocuments(query);

    res.json({
      success: true,
      data: valets,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching valets',
      error: error.message
    });
  }
});

// GET /api/valets/:id - Get specific valet
router.get('/:id', async (req, res) => {
  try {
    const valet = await Valet.findById(req.params.id)
      .populate('currentVehicle', 'vehicleNo guestName type timeIn');

    if (!valet) {
      return res.status(404).json({
        success: false,
        message: 'Valet not found'
      });
    }

    // Get valet's recent activity
    const recentVehicles = await Vehicle.find({ valet: req.params.id })
      .sort({ timeIn: -1 })
      .limit(10)
      .select('vehicleNo guestName type timeIn timeOut status');

    res.json({
      success: true,
      data: {
        ...valet.toObject(),
        recentActivity: recentVehicles
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching valet',
      error: error.message
    });
  }
});

// POST /api/valets - Add new valet
router.post('/', validateValet, async (req, res) => {
  try {
    const valet = new Valet(req.body);
    await valet.save();

    res.status(201).json({
      success: true,
      message: 'Valet added successfully',
      data: valet
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error adding valet',
      error: error.message
    });
  }
});

// PUT /api/valets/:id - Update valet
router.put('/:id', async (req, res) => {
  try {
    const valet = await Valet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!valet) {
      return res.status(404).json({
        success: false,
        message: 'Valet not found'
      });
    }

    res.json({
      success: true,
      message: 'Valet updated successfully',
      data: valet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating valet',
      error: error.message
    });
  }
});

// DELETE /api/valets/:id - Deactivate valet
router.delete('/:id', async (req, res) => {
  try {
    const valet = await Valet.findByIdAndUpdate(
      req.params.id,
      { isActive: false, status: 'Off Duty' },
      { new: true }
    );

    if (!valet) {
      return res.status(404).json({
        success: false,
        message: 'Valet not found'
      });
    }

    res.json({
      success: true,
      message: 'Valet deactivated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deactivating valet',
      error: error.message
    });
  }
});

// GET /api/valets/stats/:id - Get valet statistics
router.get('/stats/:id', async (req, res) => {
  try {
    const valet = await Valet.findById(req.params.id);
    if (!valet) {
      return res.status(404).json({
        success: false,
        message: 'Valet not found'
      });
    }

    const stats = await Vehicle.aggregate([
      { $match: { valet: valet._id } },
      {
        $group: {
          _id: null,
          totalVehicles: { $sum: 1 },
          completedVehicles: {
            $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] }
          },
          avgParkingTime: {
            $avg: {
              $cond: [
                { $ne: ['$timeOut', null] },
                { $subtract: ['$timeOut', '$timeIn'] },
                null
              ]
            }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        valet: valet.name,
        stats: stats[0] || {
          totalVehicles: 0,
          completedVehicles: 0,
          avgParkingTime: 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching valet statistics',
      error: error.message
    });
  }
});

export default router;