import type { Request, Response } from 'express';
import ProdutoService from '../services/produtoService.js';
import {
  CriarProdutoSchema,
  AtualizarProdutoSchema
} from '../validates/produto.js';
import { ZodError } from 'zod';

class ProdutoController {

  private handleError(
    res: Response,
    error: unknown,
    defaultMessage: string,
    defaultStatus = 500
  ) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        mensagem: "Erro de validação.",
        erros: error.issues.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      });
    }

    if (error instanceof Error) {
      if (
        error.message.includes('Categoria com ID') &&
        error.message.includes('não encontrada')
      ) {
        return res.status(404).json({ mensagem: error.message });
      }

      return res.status(defaultStatus).json({ mensagem: error.message });
    }

    return res.status(defaultStatus).json({ mensagem: defaultMessage });
  }

  async criar(req: Request, res: Response) {
    try {
      const dadosValidados = CriarProdutoSchema.parse(req.body);
      const novoProduto = await ProdutoService.criar(dadosValidados);
      return res.status(201).json(novoProduto);
    } catch (error) {
      return this.handleError(res, error, "Erro ao criar produto.");
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const produtos = await ProdutoService.listarTodas();
      return res.status(200).json(produtos);
    } catch (error) {
      return this.handleError(res, error, "Erro ao listar produtos.");
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        return res.status(400).json({ mensagem: "ID inválido." });
      }

      const produto = await ProdutoService.buscarPorId(id);

      if (!produto) {
        return res.status(404).json({
          mensagem: "Produto não encontrado."
        });
      }

      return res.status(200).json(produto);
    } catch (error) {
      return this.handleError(res, error, "Erro ao buscar produto.");
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        return res.status(400).json({ mensagem: "ID inválido." });
      }

      const dadosValidados = AtualizarProdutoSchema.parse(req.body);

      if (Object.keys(dadosValidados).length === 0) {
        return res.status(400).json({
          mensagem: "Nenhum dado fornecido para atualização."
        });
      }

      const produtoAtualizado =
        await ProdutoService.atualizar(id, dadosValidados);

      if (!produtoAtualizado) {
        return res.status(404).json({
          mensagem: "Produto não encontrado para atualização."
        });
      }

      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      return this.handleError(res, error, "Erro ao atualizar produto.");
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        return res.status(400).json({ mensagem: "ID inválido." });
      }

      const sucesso = await ProdutoService.deletar(id);

      if (!sucesso) {
        return res.status(404).json({
          mensagem: "Produto não encontrado para exclusão."
        });
      }

      return res.status(204).send();
    } catch (error) {
      return this.handleError(res, error, "Erro ao deletar produto.");
    }
  }
}

export default new ProdutoController();
