import express from 'express';
import crudRoutes from './routes/crudRoutes.js';
import { initDb } from './services/dbService.js';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api', crudRoutes);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to init database:', error);
  });
