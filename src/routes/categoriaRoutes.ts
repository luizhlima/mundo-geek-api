import { Router } from 'express';
import CategoriaController from '../controllers/categoriaController.js';

const categoriaRoutes = Router();

categoriaRoutes.post('/', CategoriaController.criar.bind(CategoriaController));
categoriaRoutes.get('/', CategoriaController.listar.bind(CategoriaController));
categoriaRoutes.get('/:id', CategoriaController.buscarPorId.bind(CategoriaController));
categoriaRoutes.put('/:id', CategoriaController.atualizar.bind(CategoriaController));
categoriaRoutes.delete('/:id', CategoriaController.deletar.bind(CategoriaController));

export default categoriaRoutes; 