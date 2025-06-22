export class ChoferRepository {
    constructor(ChoferModel) {
        this.Chofer = ChoferModel;
    }

    async findAll() {
        return await this.Chofer.find({ delete: false });
    }

    async findByFilter(filter = {}) {
        return await this.Chofer.find({ delete: false, ...filter });
    }

    async findById(id) {
        return await this.Chofer.findOne({ _id: id, delete: false });
    }

    async create(data) {
        return await this.Chofer.create(data);
    }

    async update(id, data) {
        const chofer = await this.Chofer.findOne({ _id: id, delete: false });
        if (!chofer) {
            throw new Error('Chofer no encontrado');
        }
        return await chofer.updateOne({ ...data });
    }

    async activate(id) {
        const chofer = await this.Chofer.findOne({ _id: id, delete: false });
        if (!chofer) {
            throw new Error('Chofer no encontrado');
        }
        return await chofer.updateOne({ status: 'activo' });
    }

    async deactivate(id) {
        const chofer = await this.Chofer.findOne({ _id: id, delete: false });
        if (!chofer) {
            throw new Error('Chofer no encontrado');
        }
        return await chofer.updateOne({ status: 'inactivo' });
    }

    async delete(id) {
        const chofer = await this.Chofer.findOne({ _id: id, delete: false });
        if (!chofer) {
            throw new Error('Chofer no encontrado');
        }
        return await chofer.updateOne({ delete: true });
    }
}
