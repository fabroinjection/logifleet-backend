import Joi from 'joi';

export const choferSchema = Joi.object({
    nombre: Joi.string().trim().required(),
    apellido: Joi.string().trim().required(),
    edad: Joi.number().min(18).max(65).required(),
    dni: Joi.string().length(8).required(),
    telefono: Joi.string().required(),
    status: Joi.string().valid('activo', 'inactivo'),
    licencia: Joi.string().valid('A', 'B', 'C', 'D', 'E').required(),
});
