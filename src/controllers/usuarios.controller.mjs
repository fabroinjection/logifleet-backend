import { usuarioSchema } from '../schemas/usuarios.joi.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUsuarioController(usuarioRepository) {
    return {
        async login(req, res) {
            const { email, password } = req.body;
            try {
                const usuario = await usuarioRepository.getByEmail(email);
                if (!usuario) {
                    return res.status(401).json({ error: 'Usuario inexistente' });
                }

                const isPasswordValid = await bcrypt.compare(password, usuario.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ error: 'Contraseña incorrecta' });
                }

                const token = jwt.sign(
                    { id: usuario._id, email: usuario.email, role: usuario.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: 3600000,
                }); // 1 hour
            } catch (error) {
                return res.status(401).json({ error: error.message });
            }
        },

        async register(req, res) {
            const { error, value } = usuarioSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const usuarioExists = await usuarioRepository.getByEmail(value.email);
            if (usuarioExists) {
                return res.status(400).json({ error: 'El email ya está registrado' });
            }

            try {
                const hashedPassword = await bcrypt.hash(
                    value.password,
                    parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
                );
                const newUser = { ...value, password: hashedPassword };
                await usuarioRepository.register(newUser);
                const returnUser = { ...newUser, password: undefined };
                return res.status(201).json(returnUser);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        },

        async delete(req, res) {
            try {
                const usuario = await usuarioRepository.delete(req.params.id);
                return res.json(usuario);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async logout(req, res) {
            res.clearCookie('token');
            return res.status(200).json({ message: 'Logout exitoso' });
        },
    };
}
