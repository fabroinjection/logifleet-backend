import { choferSchema } from '../schemas/choferes.joi.mjs';

export function createChoferController(choferRepository) {
    return {
        async getAll(req, res) {
            try {
                const choferes = await choferRepository.findAll();
                return res.json(choferes);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async getByFilter(req, res) {
            try {
                const filters = req.query;
                const choferesFiltrados = await choferRepository.findByFilter(filters);
                return res.json(choferesFiltrados);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async getActivos(req, res) {
            try {
                const choferes = await choferRepository.findByFilter({ status: 'activo' });
                return res.json(choferes);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async getInactivos(req, res) {
            try {
                const choferes = await choferRepository.findByFilter({ status: 'inactivo' });
                return res.json(choferes);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async getById(req, res) {
            try {
                const chofer = await choferRepository.findById(req.params.id);
                if (!chofer) {
                    return res.status(404).json({ error: 'Chofer no encontrado' });
                }
                return res.json(chofer);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async create(req, res) {
            const { error, value } = choferSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            try {
                const chofer = await choferRepository.create(value);
                return res.status(201).json(chofer);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async update(req, res) {
            const { error, value } = choferSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            try {
                const chofer = await choferRepository.update(req.params.id, value);
                if (!chofer) {
                    return res.status(404).json({ error: 'Chofer no encontrado' });
                }
                return res.json(value);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async activate(req, res) {
            try {
                const chofer = await choferRepository.activate(req.params.id);
                if (!chofer) {
                    return res.status(404).json({ error: 'Chofer no encontrado' });
                }
                return res.json(chofer);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async deactivate(req, res) {
            try {
                const chofer = await choferRepository.deactivate(req.params.id);
                if (!chofer) {
                    return res.status(404).json({ error: 'Chofer no encontrado' });
                }
                return res.json(chofer);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },

        async delete(req, res) {
            try {
                const chofer = await choferRepository.delete(req.params.id);
                if (!chofer) {
                    return res.status(404).json({ error: 'Chofer no encontrado' });
                }
                return res.json(chofer);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        },
    };
}
