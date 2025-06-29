import './src/config/env.mjs';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/config/db.mjs';
import choferesRoute from './src/routes/choferes.route.mjs';
import vehiculosRoute from './src/routes/vehiculos.route.mjs';

const app = express();

app.use(cors());
app.use(express.json());

await connectToDatabase(process.env.DB_URI);

app.use('/api/choferes', choferesRoute);
app.use('/api/vehiculos', vehiculosRoute);

export default app;
