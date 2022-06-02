const Joi = require('joi');

module.exports = {
    createProductSchema: Joi.object({
        title: Joi.string().alphanum().min(3).max(50).required(),
        price: Joi.number().required(),
        thumbnail: Joi.string().alphanum().required(),
        stock: Joi.number().required(),
        descripcion: Joi.string().required(),
        codigo: Joi.required()
    }),
    updateProductSchema: Joi.object({
        title: Joi.string().alphanum().min(3).max(50).required(),
        price: Joi.number().required(),
        thumbnail: Joi.string().alphanum().required(),
        stock: Joi.number().required(),
        descripcion: Joi.string().required(),
        codigo: Joi.required()
    })
}
