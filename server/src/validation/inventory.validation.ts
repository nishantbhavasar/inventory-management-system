import joi from "joi";

export const getAllInventoryValidate = joi.object({
  limit: joi.number(),
  page: joi.number(),
  search: joi.string().trim(true),
  sort: joi.object({
    column: joi.string().required(),
    desc: joi.boolean().default(true),
  }),
});

export const createInventoryValidate = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().required(),
  created_by: joi.number().required(),
  categories: joi.array().items(joi.number().required()),
});

export const updateInventoryValidate = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().required(),
  categories: joi.array().items(joi.number().required()),
});

