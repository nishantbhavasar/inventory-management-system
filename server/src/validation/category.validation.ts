import joi from "joi";

export const createCategorySchemaValidate = joi.object({
    category_name: joi.string().required(),
});

