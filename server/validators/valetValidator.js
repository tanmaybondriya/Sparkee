import Joi from 'joi';

const valetSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
  employeeId: Joi.string()
    .alphanum()
    .min(3)
    .max(10)
    .required(),
  mobile: Joi.string()
    .pattern(/^\+91[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Mobile number must be in format: +919876543210'
    }),
  shift: Joi.string()
    .valid('Morning', 'Evening', 'Night')
    .required(),
  status: Joi.string()
    .valid('Available', 'Busy', 'Off Duty')
    .default('Available'),
  rating: Joi.number()
    .min(1)
    .max(5)
    .default(5)
});

export const validateValet = (req, res, next) => {
  const { error } = valetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};