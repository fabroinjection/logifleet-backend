import mongoose from 'mongoose';

const choferesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    edad: {
        type: Number,
        required: true,
        min: 18,
        max: 65,
    },
    dni: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8,
        trim: true,
        unique: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo',
    },
    licencia: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
        required: true,
        trim: true,
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

export const Chofer = mongoose.model('choferes', choferesSchema);
