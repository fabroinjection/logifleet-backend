import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determinar el entorno (por defecto: development)
const env = process.env.NODE_ENV || 'development';

// Ruta al archivo .env correspondiente
const envPath = path.resolve(__dirname, `../../.env.${env}`);

// Cargar el archivo
dotenv.config({ path: envPath });

export const {
  PORT,
  JWT_SECRET,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;