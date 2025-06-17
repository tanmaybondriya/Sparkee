import Joi from 'joi';

const slotSchema = Joi.object({
  number: Joi.string()
    .pattern(/^[A-E]-[0-9]{2}$/)
    .required()
    .messages({
      'string.pattern.base': 'Slot number must be in format: A-01, B-15, etc.'
    }),
  section: Joi.string()
    .valid('A', 'B', 'C', 'D', 'E')
    .required(),
  floor: Joi.number()
    .min(0)
    .max(10)
    .default(0),
  vehicleType: Joi.string()
    .valid('Car', 'Bike', 'SUV', 'Truck', 'Any')
    .default('Any'),
  coordinates: Joi.object({
    x: Joi.number().default(0),
    y: Joi.number().default(0)
  }).optional()
});

export const validateSlot = (req, res, next) => {
  const { error } = slotSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};