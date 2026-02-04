import { Router } from 'express';
import categoriaRoutes from './categoriaRoutes.js';
import produtoRoutes from './produtoRoutes.js';

const routes = Router();

routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes)

export default routes; 