import Joi from 'joi';

const habilitiesDTO = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const championSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  localization: Joi.string().required(),
  class: Joi.string().required(),
  gender: Joi.string().required(),
  habilities: Joi.array().items(habilitiesDTO).required(),
});

export { championSchema };