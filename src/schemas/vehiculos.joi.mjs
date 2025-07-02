import Joi from 'joi';

export const vehiculoSchema = Joi.object({
    patente: Joi.string()
        .trim()
        .required()
        .pattern(/^[A-Z]{2} \d{3} [A-Z]{2}$|^[A-Z]{3} \d{3}$/),
    nro_chasis: Joi.string()
        .trim()
        .pattern(/^[A-Z0-9]{17}$/)
        .min(17)
        .max(17),
    nro_motor: Joi.string().trim(),
    marca: Joi.string().trim().required(),
    modelo: Joi.string().trim().required(),
    estado: Joi.string().valid('activo', 'inactivo'),
    tipo: Joi.string().valid('Camion', 'Camioneta', 'Auto', 'Moto').required(),
    capacidad: Joi.number().min(1).required(),
    anio: Joi.number().min(2000).max(new Date().getFullYear()).required(),
    chofer: Joi.string().length(24).hex(),
});
