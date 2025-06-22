import { Router } from 'express';
import { Chofer } from '../models/mongodb/choferes.models.mjs';
import { ChoferRepository } from '../repositories/mongodb/choferes.repository.mjs';
import { createChoferController } from '../controllers/choferes.controller.mjs';

const router = Router();

const choferRepository = new ChoferRepository(Chofer);
const choferController = createChoferController(choferRepository);

router.get('/', choferController.getAll);
router.get('/filter', choferController.getByFilter);
router.get('/activos', choferController.getActivos);
router.get('/inactivos', choferController.getInactivos);
router.get('/:id', choferController.getById);
router.post('/', choferController.create);
router.put('/:id', choferController.update);
router.delete('/:id', choferController.delete);
router.patch('/:id/activate', choferController.activate);
router.patch('/:id/deactivate', choferController.deactivate);

export default router;
