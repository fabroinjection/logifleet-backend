export class VehiculoRepository {
    constructor(VehiculoModel) {
        this.Vehiculo = VehiculoModel;
    }

    async findAll() {
        return await this.Vehiculo.find({ delete: false });
    }

    async findByFilter(filter = {}) {
        return await this.Vehiculo.find({ delete: false, ...filter });
    }

    async findById(id) {
        return await this.Vehiculo.findOne({ _id: id, delete: false });
    }
    
    async findByNroMotor(nroMotor) {
        return await this.Vehiculo.findOne({ nro_motor: nroMotor, delete: false });
    }

    async findByPatente(patente) {
        return await this.Vehiculo.findOne({ patente: patente, delete: false });
    }

    async findByNroChasis(nroChasis) {
        return await this.Vehiculo.findOne({ nro_chasis: nroChasis, delete: false });
    }

    async create(data) {
        return await this.Vehiculo.create(data);
    }

    async update(id, data) {
        const vehiculo = await this.Vehiculo.findOne({ _id: id, delete: false });
        if (!vehiculo) {
            throw new Error('Vehículo no encontrado');
        }
        return await vehiculo.updateOne({ ...data });
    }

    async activate(id) {
        const vehiculo = await this.Vehiculo.findOne({ _id: id, delete: false });
        if (!vehiculo) {
            throw new Error('Vehículo no encontrado');
        }
        return await vehiculo.updateOne({ estado: 'activo' });
    }

    async deactivate(id) {
        const vehiculo = await this.Vehiculo.findOne({ _id: id, delete: false });
        if (!vehiculo) {
            throw new Error('Vehículo no encontrado');
        }
        return await vehiculo.updateOne({ estado: 'inactivo' });
    }

    async delete(id) {
        const vehiculo = await this.Vehiculo.findOne({ _id: id, delete: false });
        if (!vehiculo) {
            throw new Error('Vehículo no encontrado');
        }
        return await vehiculo.updateOne({ delete: true });
    }
    
}
