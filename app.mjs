import './src/config/env.mjs';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './src/config/db.mjs';
import choferesRoute from './src/routes/choferes.route.mjs';
import vehiculosRoute from './src/routes/vehiculos.route.mjs';
import usuariosRoute from './src/routes/usuarios.route.mjs';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

await connectToDatabase(process.env.DB_URI);

app.use('/api', usuariosRoute);
app.use('/api/choferes', choferesRoute);
app.use('/api/vehiculos', vehiculosRoute);

export default app;
