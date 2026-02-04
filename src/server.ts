import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { initializeDatabase } from './database/data-source.js';
import routes from './routes/index.js'; 


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', routes); 

app.get('/', (req: Request, res: Response) => {
  res.send('API Mundo Geek rodando!');
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Falha ao iniciar o servidor devido a erro no banco de dados:', error);
    process.exit(1);
  });