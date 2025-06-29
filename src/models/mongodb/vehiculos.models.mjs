import mongoose from 'mongoose';

const vehiculosSchema = new mongoose.Schema({
    patente: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
        match: /^[A-Z]{2} \d{3} [A-Z]{2}$|^[A-Z]{3} \d{3}$/, // Matches formats like "AB 123 CD" or "ABC 123"
    },
    nro_chasis: {
        type: String,
        trim: true,
        unique: true,
        minlength: 17,
        maxlength: 17, // Standard length for vehicle chassis numbers
        match: /^[A-Z0-9]+$/i,
    },
    nro_motor: {
        type: String,
        trim: true,
        unique: true,
    },
    marca: {
        type: String,
        required: true,
        trim: true,
    },
    modelo: {
        type: String,
        required: true,
        trim: true,
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'en reparación'],
        default: 'activo',
    },
    tipo: {
        type: String,
        enum: ['Camion', 'Camioneta', 'Auto', 'Moto'],
        required: true,
        trim: true,
    },
    capacidad: {
        type: Number,
        required: true,
        min: 1,
    },
    anio: {
        type: Number,
        required: true,
        min: 2000,
        max: new Date().getFullYear(),
    },
    chofer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'choferes'
    },
    delete: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Vehiculo = mongoose.model('vehiculos', vehiculosSchema);
