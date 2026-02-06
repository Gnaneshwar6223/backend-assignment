const Joi = require("joi");

exports.registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").optional()
});

exports.taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional()
});
