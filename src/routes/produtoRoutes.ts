import { Router } from 'express';
import ProdutoController from '../controllers/produtoController.js';

const produtoRoutes = Router();

produtoRoutes.post('/', ProdutoController.criar.bind(ProdutoController));
produtoRoutes.get('/', ProdutoController.listar.bind(ProdutoController));
produtoRoutes.get('/:id', ProdutoController.buscarPorId.bind(ProdutoController));
produtoRoutes.put('/:id', ProdutoController.atualizar.bind(ProdutoController));
produtoRoutes.delete('/:id', ProdutoController.deletar.bind(ProdutoController));

export default produtoRoutes;