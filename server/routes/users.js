import express from 'express';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import { validateUser } from '../validators/userValidator.js';

const router = express.Router();

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const { search, isVIP, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (isVIP !== undefined) query.isVIP = isVIP === 'true';
    if (search) {
      query.$or = [
        { guestName: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .sort({ totalVisits: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// GET /api/users/:id - Get specific user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get current active vehicles for this user
    const activeVehicles = await Vehicle.find({
      mobile: user.mobile,
      status: { $ne: 'Completed' }
    }).populate('valet', 'name').populate('slot', 'number section');

    res.json({
      success: true,
      data: {
        ...user.toObject(),
        activeVehicles
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// GET /api/users/mobile/:mobile - Get user by mobile number
router.get('/mobile/:mobile', async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.params.mobile });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get current active vehicles for this user
    const activeVehicles = await Vehicle.find({
      mobile: user.mobile,
      status: { $ne: 'Completed' }
    }).populate('valet', 'name').populate('slot', 'number section');

    res.json({
      success: true,
      data: {
        ...user.toObject(),
        activeVehicles
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
});

// POST /api/users - Add new user
router.post('/', validateUser, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User added successfully',
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error adding user',
      error: error.message
    });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has active vehicles
    const activeVehicles = await Vehicle.countDocuments({
      mobile: user.mobile,
      status: { $ne: 'Completed' }
    });

    if (activeVehicles > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with active vehicles'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
});

// GET /api/users/:id/history - Get user's parking history
router.get('/:id/history', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const vehicles = await Vehicle.find({ mobile: user.mobile })
      .populate('valet', 'name')
      .populate('slot', 'number section')
      .sort({ timeIn: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Vehicle.countDocuments({ mobile: user.mobile });

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
      message: 'Error fetching user history',
      error: error.message
    });
  }
});

export default router;