import joi from "joi";

export const registarSchemaValidate = joi.object({
  password: joi.string().min(8).trim(true).required(),
  email: joi.string().email().trim(true).required(),
  name:joi.string().trim(true).required(),
  role_id:joi.number()
});

export const loginSchemaValidate = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
