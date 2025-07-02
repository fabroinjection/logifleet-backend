import Router from 'express';
import { Usuario } from '../models/mongodb/usuarios.models.mjs';
import { UsuarioRepository } from '../repositories/mongodb/usuarios.repository.mjs';
import { createUsuarioController } from '../controllers/usuarios.controller.mjs';

const router = Router();

const usuarioRepository = new UsuarioRepository(Usuario);
const usuarioController = createUsuarioController(usuarioRepository);

router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);
router.delete('/usuarios/:id', usuarioController.delete);
router.post('/logout', usuarioController.logout);

export default router;
