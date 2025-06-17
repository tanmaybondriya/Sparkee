import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ParkingSlot from '../models/ParkingSlot.js';
import Valet from '../models/Valet.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/valet_management');
    console.log('Connected to MongoDB');

    // Clear existing data
    await ParkingSlot.deleteMany({});
    await Valet.deleteMany({});

    // Create parking slots
    const slots = [];
    const sections = ['A', 'B', 'C', 'D', 'E'];
    
    for (let section of sections) {
      for (let i = 1; i <= 10; i++) {
        const slotNumber = `${section}-${String(i).padStart(2, '0')}`;
        slots.push({
          number: slotNumber,
          section: section,
          floor: 0,
          vehicleType: i <= 6 ? 'Car' : i <= 8 ? 'Bike' : 'Any',
          coordinates: {
            x: sections.indexOf(section) * 100,
            y: i * 50
          }
        });
      }
    }

    await ParkingSlot.insertMany(slots);
    console.log('✅ Created 50 parking slots');

    // Create valets
    const valets = [
      {
        name: 'Raj Kumar',
        employeeId: 'VAL001',
        mobile: '+919876543210',
        shift: 'Morning',
        status: 'Available',
        rating: 4.8
      },
      {
        name: 'Amit Singh',
        employeeId: 'VAL002',
        mobile: '+919876543211',
        shift: 'Morning',
        status: 'Available',
        rating: 4.6
      },
      {
        name: 'Priya Sharma',
        employeeId: 'VAL003',
        mobile: '+919876543212',
        shift: 'Evening',
        status: 'Available',
        rating: 4.9
      },
      {
        name: 'Deepak Patel',
        employeeId: 'VAL004',
        mobile: '+919876543213',
        shift: 'Evening',
        status: 'Available',
        rating: 4.7
      },
      {
        name: 'Sunita Yadav',
        employeeId: 'VAL005',
        mobile: '+919876543214',
        shift: 'Night',
        status: 'Available',
        rating: 4.5
      }
    ];

    await Valet.insertMany(valets);
    console.log('✅ Created 5 valets');

    console.log('🎉 Seed data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();