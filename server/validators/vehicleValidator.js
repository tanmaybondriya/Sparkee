import Joi from 'joi';

const vehicleSchema = Joi.object({
  vehicleNo: Joi.string()
    .pattern(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'Vehicle number must be in format: MH12AB1234'
    }),
  type: Joi.string()
    .valid('Car', 'Bike', 'SUV', 'Truck')
    .required(),
  guestName: Joi.string()
    .min(2)
    .max(50)
    .required(),
  mobile: Joi.string()
    .pattern(/^\+91[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Mobile number must be in format: +919876543210'
    }),
  gender: Joi.string()
    .valid('Male', 'Female', 'Other')
    .default('Male'),
  notes: Joi.string()
    .max(500)
    .optional()
});

const vehicleUpdateSchema = Joi.object({
  status: Joi.string()
    .valid('Parked', 'In Transit', 'Requested', 'Being Delivered', 'Completed')
    .optional(),
  valetId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional(),
  slotId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional(),
  notes: Joi.string()
    .max(500)
    .optional()
});

export const validateVehicle = (req, res, next) => {
  const { error } = vehicleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

export const validateVehicleUpdate = (req, res, next) => {
  const { error } = vehicleUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};