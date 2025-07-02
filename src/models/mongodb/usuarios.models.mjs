import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    delete: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'chofer', 'encargado'],
        required: true,
    },
    refEntidad: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'role', // Reference to the collection based on the role
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Usuario = mongoose.model('usuarios', usuarioSchema);
