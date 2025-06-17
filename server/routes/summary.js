import express from 'express';
import Vehicle from '../models/Vehicle.js';
import ParkingSlot from '../models/ParkingSlot.js';
import Valet from '../models/Valet.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/summary - Get dashboard summary
router.get('/', async (req, res) => {
  try {
    // Get vehicle statistics
    const vehicleStats = await Vehicle.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get parking slot statistics
    const slotStats = await ParkingSlot.aggregate([
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

    // Get valet statistics
    const valetStats = await Valet.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get today's statistics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStats = await Vehicle.aggregate([
      {
        $match: {
          timeIn: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $group: {
          _id: null,
          totalCheckIns: { $sum: 1 },
          completedCheckOuts: {
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

    // Get revenue calculation (assuming ₹50 per hour)
    const revenueStats = await Vehicle.aggregate([
      {
        $match: {
          timeOut: { $ne: null },
          timeIn: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $project: {
          parkingDuration: { $subtract: ['$timeOut', '$timeIn'] },
          vehicleType: 1
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: [
                { $divide: ['$parkingDuration', 1000 * 60 * 60] }, // Convert to hours
                50 // ₹50 per hour
              ]
            }
          }
        }
      }
    ]);

    // Get peak hours data
    const peakHours = await Vehicle.aggregate([
      {
        $match: {
          timeIn: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $project: {
          hour: { $hour: '$timeIn' }
        }
      },
      {
        $group: {
          _id: '$hour',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    // Format vehicle stats
    const vehicleStatsFormatted = {
      total: 0,
      parked: 0,
      inTransit: 0,
      requested: 0,
      beingDelivered: 0,
      completed: 0
    };

    vehicleStats.forEach(stat => {
      vehicleStatsFormatted.total += stat.count;
      switch (stat._id) {
        case 'Parked':
          vehicleStatsFormatted.parked = stat.count;
          break;
        case 'In Transit':
          vehicleStatsFormatted.inTransit = stat.count;
          break;
        case 'Requested':
          vehicleStatsFormatted.requested = stat.count;
          break;
        case 'Being Delivered':
          vehicleStatsFormatted.beingDelivered = stat.count;
          break;
        case 'Completed':
          vehicleStatsFormatted.completed = stat.count;
          break;
      }
    });

    // Format valet stats
    const valetStatsFormatted = {
      total: 0,
      available: 0,
      busy: 0,
      offDuty: 0
    };

    valetStats.forEach(stat => {
      valetStatsFormatted.total += stat.count;
      switch (stat._id) {
        case 'Available':
          valetStatsFormatted.available = stat.count;
          break;
        case 'Busy':
          valetStatsFormatted.busy = stat.count;
          break;
        case 'Off Duty':
          valetStatsFormatted.offDuty = stat.count;
          break;
      }
    });

    res.json({
      success: true,
      data: {
        vehicles: vehicleStatsFormatted,
        parkingSlots: slotStats[0] || { totalSlots: 0, occupiedSlots: 0, availableSlots: 0 },
        valets: valetStatsFormatted,
        today: {
          checkIns: todayStats[0]?.totalCheckIns || 0,
          checkOuts: todayStats[0]?.completedCheckOuts || 0,
          avgParkingTime: Math.round((todayStats[0]?.avgParkingTime || 0) / (1000 * 60)), // in minutes
          revenue: Math.round(revenueStats[0]?.totalRevenue || 0)
        },
        peakHours: peakHours.map(hour => ({
          hour: `${hour._id}:00`,
          count: hour.count
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching summary',
      error: error.message
    });
  }
});

// GET /api/summary/analytics - Get detailed analytics
router.get('/analytics', async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calculate date range based on period
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    // Daily vehicle check-ins
    const dailyCheckIns = await Vehicle.aggregate([
      {
        $match: {
          timeIn: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$timeIn' },
            month: { $month: '$timeIn' },
            day: { $dayOfMonth: '$timeIn' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Vehicle type distribution
    const vehicleTypeDistribution = await Vehicle.aggregate([
      {
        $match: {
          timeIn: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Average parking duration by vehicle type
    const avgParkingDuration = await Vehicle.aggregate([
      {
        $match: {
          timeIn: { $gte: startDate, $lte: endDate },
          timeOut: { $ne: null }
        }
      },
      {
        $project: {
          type: 1,
          duration: { $subtract: ['$timeOut', '$timeIn'] }
        }
      },
      {
        $group: {
          _id: '$type',
          avgDuration: { $avg: '$duration' }
        }
      }
    ]);

    // Top performing valets
    const topValets = await Vehicle.aggregate([
      {
        $match: {
          timeIn: { $gte: startDate, $lte: endDate },
          valet: { $ne: null }
        }
      },
      {
        $group: {
          _id: '$valet',
          vehiclesHandled: { $sum: 1 },
          avgHandlingTime: {
            $avg: {
              $cond: [
                { $ne: ['$timeOut', null] },
                { $subtract: ['$timeOut', '$timeIn'] },
                null
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'valets',
          localField: '_id',
          foreignField: '_id',
          as: 'valetInfo'
        }
      },
      { $unwind: '$valetInfo' },
      { $sort: { vehiclesHandled: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        period,
        dateRange: { startDate, endDate },
        dailyCheckIns: dailyCheckIns.map(item => ({
          date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`,
          count: item.count
        })),
        vehicleTypeDistribution,
        avgParkingDuration: avgParkingDuration.map(item => ({
          type: item._id,
          avgDurationMinutes: Math.round(item.avgDuration / (1000 * 60))
        })),
        topValets: topValets.map(item => ({
          name: item.valetInfo.name,
          employeeId: item.valetInfo.employeeId,
          vehiclesHandled: item.vehiclesHandled,
          avgHandlingTimeMinutes: Math.round((item.avgHandlingTime || 0) / (1000 * 60))
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
});

export default router;