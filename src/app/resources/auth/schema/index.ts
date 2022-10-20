import * as Joi from 'joi';

const createSchemaJoiObj = Joi.object({
  username: Joi.string().min(4).max(20),
  password: Joi.string().min(8).max(12).alphanum(),
});

export { createSchemaJoiObj };
