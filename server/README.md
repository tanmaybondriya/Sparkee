# Valet Management System - Backend API

A comprehensive RESTful API for managing valet parking operations built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Vehicle Management**: Check-in, tracking, and check-out of vehicles
- **Valet Staff Management**: Staff scheduling and performance tracking
- **Parking Slot Management**: Real-time slot availability and allocation
- **User Management**: Guest profiles and visit history
- **Analytics & Reporting**: Comprehensive dashboard statistics
- **QR Code Generation**: Automated QR codes for vehicle pickup
- **Real-time Updates**: Live status updates for all operations

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Environment**: dotenv

## 📦 Installation

1. **Clone and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (update MONGODB_URI in .env)
   ```

5. **Seed initial data**
   ```bash
   node scripts/seedData.js
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 🔗 API Endpoints

### Vehicle Management
- `GET /api/vehicles` - Get all vehicles (with filtering, pagination)
- `GET /api/vehicles/:id` - Get specific vehicle details
- `POST /api/vehicles` - Check-in new vehicle
- `PUT /api/vehicles/:id` - Update vehicle status/assignment
- `DELETE /api/vehicles/:id` - Check-out vehicle

### Valet Staff
- `GET /api/valets` - List all valets
- `GET /api/valets/:id` - Get valet details with activity
- `POST /api/valets` - Add new valet
- `PUT /api/valets/:id` - Update valet information
- `DELETE /api/valets/:id` - Deactivate valet
- `GET /api/valets/stats/:id` - Get valet performance statistics

### Parking Slots
- `GET /api/slots` - Get all parking slots with availability
- `GET /api/slots/:id` - Get specific slot details
- `POST /api/slots` - Add new parking slot
- `PUT /api/slots/:id` - Update slot information
- `DELETE /api/slots/:id` - Deactivate slot
- `GET /api/slots/available/:vehicleType` - Get available slots for vehicle type

### User Management
- `GET /api/users` - Get all users/guests
- `GET /api/users/:id` - Get user details with active vehicles
- `GET /api/users/mobile/:mobile` - Get user by mobile number
- `POST /api/users` - Add new user
- `PUT /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/history` - Get user's parking history

### Analytics & Summary
- `GET /api/summary` - Get dashboard summary statistics
- `GET /api/summary/analytics` - Get detailed analytics with date ranges

### Health Check
- `GET /health` - API health status

## 📊 Data Models

### Vehicle
```javascript
{
  vehicleNo: "MH12AB1234",
  type: "Car|Bike|SUV|Truck",
  guestName: "John Doe",
  mobile: "+919876543210",
  gender: "Male|Female|Other",
  status: "Parked|In Transit|Requested|Being Delivered|Completed",
  valet: ObjectId,
  slot: ObjectId,
  qrCode: "QR123456789",
  timeIn: Date,
  timeOut: Date,
  notes: "Optional notes"
}
```

### Valet
```javascript
{
  name: "Raj Kumar",
  employeeId: "VAL001",
  mobile: "+919876543210",
  status: "Available|Busy|Off Duty",
  shift: "Morning|Evening|Night",
  vehiclesHandled: 25,
  currentVehicle: ObjectId,
  rating: 4.8,
  isActive: true
}
```

### Parking Slot
```javascript
{
  number: "A-15",
  section: "A|B|C|D|E",
  floor: 0,
  vehicleType: "Car|Bike|SUV|Truck|Any",
  occupied: false,
  currentVehicle: ObjectId,
  isActive: true,
  coordinates: { x: 100, y: 200 }
}
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Input Validation**: Joi schema validation
- **Error Handling**: Comprehensive error responses
- **Environment Variables**: Sensitive data protection

## 📈 Query Features

### Filtering & Search
```javascript
// Vehicle filtering
GET /api/vehicles?status=Parked&type=Car&search=MH12

// Pagination
GET /api/vehicles?page=2&limit=20

// Valet filtering
GET /api/valets?status=Available&shift=Morning
```

### Analytics Periods
```javascript
// Analytics with different time periods
GET /api/summary/analytics?period=24h
GET /api/summary/analytics?period=7d
GET /api/summary/analytics?period=30d
GET /api/summary/analytics?period=90d
```

## 🚦 Response Format

### Success Response
```javascript
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "pagination": { // For paginated responses
    "current": 1,
    "pages": 5,
    "total": 50
  }
}
```

### Error Response
```javascript
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation error details"],
  "stack": "..." // Only in development
}
```

## 🔧 Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/valet_management

# JWT (for future authentication)
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

## 🧪 Testing

```bash
# Test API endpoints
curl http://localhost:5000/health

# Get all vehicles
curl http://localhost:5000/api/vehicles

# Check-in new vehicle
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleNo": "MH12AB1234",
    "type": "Car",
    "guestName": "John Doe",
    "mobile": "+919876543210",
    "gender": "Male"
  }'
```

## 📝 Development Notes

- Uses ES Modules (import/export)
- MongoDB indexes for performance
- Comprehensive validation
- Automatic QR code generation
- Real-time slot allocation
- Valet assignment logic
- User visit history tracking

## 🚀 Deployment

1. **Set production environment variables**
2. **Use MongoDB Atlas for production database**
3. **Configure CORS for production frontend URL**
4. **Set up process manager (PM2)**
5. **Configure reverse proxy (Nginx)**

## 📞 Support

For issues or questions, please check the API documentation or contact the development team.