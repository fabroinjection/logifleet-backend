import { Router } from 'express';
import { Vehiculo } from '../models/mongodb/vehiculos.models.mjs';
import { Chofer } from '../models/mongodb/choferes.models.mjs';
import { VehiculoRepository } from '../repositories/mongodb/vehiculos.repository.mjs';
import { ChoferRepository } from '../repositories/mongodb/choferes.repository.mjs';
import { createVehiculoController } from '../controllers/vehiculos.controller.mjs';

const router = Router();

const vehiculoRepository = new VehiculoRepository(Vehiculo);
const choferRepository = new ChoferRepository(Chofer);
const vehiculoController = createVehiculoController(vehiculoRepository, choferRepository);

router.get('/', vehiculoController.getAll);
router.get('/filter', vehiculoController.getByFilter);
router.get('/activos', vehiculoController.getActivos);
router.get('/inactivos', vehiculoController.getInactivos);
router.get('/:id', vehiculoController.getById);
router.post('/', vehiculoController.create);
router.put('/:id', vehiculoController.update);
router.delete('/:id', vehiculoController.delete);
router.patch('/:id/activate', vehiculoController.activate);
router.patch('/:id/deactivate', vehiculoController.deactivate);
router.patch('/:id/asignar-chofer', vehiculoController.asignarChofer);

export default router;
