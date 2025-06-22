import './src/config/env.mjs';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/config/db.mjs';
  
const app = express();

app.use(cors());
app.use(express.json());

// Puerto
const PORT = process.env.PORT || 3000;

await connectToDatabase(process.env.DB_URI);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
