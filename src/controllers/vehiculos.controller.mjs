import { vehiculoSchema } from '../schemas/vehiculos.joi.mjs';

export function createVehiculoController(vehiculoRepository, choferRepository) {
    return {
        async getAll(req, res) {
            try {
                const vehiculos = await vehiculoRepository.findAll();
                return res.json(vehiculos);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async getByFilter(req, res) {
            try {
                const filters = req.query;
                const vehiculosFiltrados = await vehiculoRepository.findByFilter(filters);
                return res.json(vehiculosFiltrados);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async getActivos(req, res) {
            try {
                const vehiculos = await vehiculoRepository.findByFilter({ estado: 'activo' });
                return res.json(vehiculos);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async getInactivos(req, res) {
            try {
                const vehiculos = await vehiculoRepository.findByFilter({ estado: 'inactivo' });
                return res.json(vehiculos);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async getById(req, res) {
            try {
                const vehiculo = await vehiculoRepository.findById(req.params.id);
                if (!vehiculo) {
                    return res.status(404).json({ error: 'Vehículo no encontrado' });
                }
                return res.json(vehiculo);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async create(req, res) {
            const { error, value } = vehiculoSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const existingPatente = await vehiculoRepository.findByPatente(value.patente);
            if (existingPatente) {
                return res.status(400).json({ error: 'La patente ya está registrada' });
            }

            const existingChasis = await vehiculoRepository.findByNroChasis(value.nro_chasis);
            if (existingChasis) {
                return res.status(400).json({ error: 'El número de chasis ya está registrado' });
            }

            const existingNroMotor = await vehiculoRepository.findByNroMotor(value.nro_motor);
            if (existingNroMotor) {
                return res.status(400).json({ error: 'El número de motor ya está registrado' });
            }

            if (value.chofer) {
                const chofer = await choferRepository.findById(value.chofer);
                if (!chofer) {
                    return res.status(404).json({ error: 'Chofer no encontrado' });
                }
            }

            try {
                const vehiculo = await vehiculoRepository.create(value);
                return res.status(201).json(vehiculo);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async update(req, res) {
            const { error, value } = vehiculoSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const existingPatente = await vehiculoRepository.findByPatente(value.patente);
            if (existingPatente && existingPatente._id.toString() !== req.params.id) {
                return res.status(400).json({ error: 'La patente ya está registrada' });
            }

            const existingChasis = await vehiculoRepository.findByNroChasis(value.nro_chasis);
            if (existingChasis && existingChasis._id.toString() !== req.params.id) {
                return res.status(400).json({ error: 'El número de chasis ya está registrado' });
            }

            const existingNroMotor = await vehiculoRepository.findByNroMotor(value.nro_motor);
            if (existingNroMotor && existingNroMotor._id.toString() !== req.params.id) {
                return res.status(400).json({ error: 'El número de motor ya está registrado' });
            }

            if (value.chofer) {
                const chofer = await choferRepository.findById(value.chofer);
                if (!chofer) {
                    return res.status(404).json({ error: 'Chofer no encontrado' });
                }
            }
            try {
                const vehiculo = await vehiculoRepository.update(req.params.id, value);
                if (!vehiculo) {
                    return res.status(404).json({ error: 'Vehículo no encontrado' });
                }
                return res.json(vehiculo);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async delete(req, res) {
            try {
                const vehiculo = await vehiculoRepository.delete(req.params.id);
                if (!vehiculo) {
                    return res.status(404).json({ error: 'Vehículo no encontrado' });
                }
                return res.json({ message: 'Vehículo eliminado correctamente' });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async activate(req, res) {
            try {
                const vehiculo = await vehiculoRepository.activate(req.params.id);
                if (!vehiculo) {
                    return res.status(404).json({ error: 'Vehículo no encontrado' });
                }
                return res.json(vehiculo);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async deactivate(req, res) {
            try {
                const vehiculo = await vehiculoRepository.deactivate(req.params.id);
                if (!vehiculo) {
                    return res.status(404).json({ error: 'Vehículo no encontrado' });
                }
                return res.json(vehiculo);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async asignarChofer(req, res) {
            const { chofer } = req.body;
            if (!chofer) {
                return res.status(400).json({ error: 'El ID del chofer es requerido' });
            }

            const choferDB = await choferRepository.findById(chofer);
            if (!choferDB) {
                return res.status(404).json({ error: 'Chofer no encontrado' });
            }

            try {
                const vehiculo = await vehiculoRepository.update(req.params.id, { chofer: chofer });
                if (!vehiculo) {
                    return res.status(404).json({ error: 'Vehículo no encontrado' });
                }
                return res.json(vehiculo);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async desasignarChofer(req, res) {
            try {
                const vehiculo = await vehiculoRepository.update(req.params.id, { chofer: null });
                if (!vehiculo) {
                    return res.status(404).json({ error: 'Vehículo no encontrado' });
                }
                return res.json(vehiculo);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },
    };
}
