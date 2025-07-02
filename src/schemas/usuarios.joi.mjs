import Joi from 'joi';

export const usuarioSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string()
        .trim()
        .min(8)
        .required()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    role: Joi.string().valid('admin', 'chofer', 'encargado'),
    refEntidad: Joi.string().length(24).hex().required(),
});
