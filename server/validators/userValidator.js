import Joi from 'joi';

const userSchema = Joi.object({
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
  email: Joi.string()
    .email()
    .optional(),
  gender: Joi.string()
    .valid('Male', 'Female', 'Other')
    .default('Male'),
  isVIP: Joi.boolean()
    .default(false),
  notes: Joi.string()
    .max(500)
    .optional()
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};