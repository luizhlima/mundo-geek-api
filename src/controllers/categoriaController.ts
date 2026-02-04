import type { Request, Response } from 'express';
import CategoriaService from '../services/categoriaService.js';
import {
  CriarCategoriaSchema,
  AtualizarCategoriaSchema
} from '../validates/categoria.js';
import { ZodError } from 'zod';

class CategoriaController {

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
      return res.status(defaultStatus).json({ mensagem: error.message });
    }

    return res.status(defaultStatus).json({ mensagem: defaultMessage });
  }

  async criar(req: Request, res: Response) {
    try {
      const dadosValidados = CriarCategoriaSchema.parse(req.body);
      const novaCategoria = await CategoriaService.criar(dadosValidados);
      return res.status(201).json(novaCategoria);
    } catch (error) {
      return this.handleError(res, error, "Erro ao criar categoria.");
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const categorias = await CategoriaService.listarTodas();
      return res.status(200).json(categorias);
    } catch (error) {
      return this.handleError(res, error, "Erro ao listar categorias.");
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        return res.status(400).json({ mensagem: "ID inválido." });
      }

      const categoria = await CategoriaService.buscarPorId(id);

      if (!categoria) {
        return res.status(404).json({ mensagem: "Categoria não encontrada." });
      }

      return res.status(200).json(categoria);
    } catch (error) {
      return this.handleError(res, error, "Erro ao buscar categoria.");
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        return res.status(400).json({ mensagem: "ID inválido." });
      }

      const dadosValidados = AtualizarCategoriaSchema.parse(req.body);

      if (Object.keys(dadosValidados).length === 0) {
        return res.status(400).json({
          mensagem: "Nenhum dado fornecido para atualização."
        });
      }

      const categoriaAtualizada =
        await CategoriaService.atualizar(id, dadosValidados);

      if (!categoriaAtualizada) {
        return res.status(404).json({
          mensagem: "Categoria não encontrada para atualização."
        });
      }

      return res.status(200).json(categoriaAtualizada);
    } catch (error) {
      return this.handleError(res, error, "Erro ao atualizar categoria.");
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        return res.status(400).json({ mensagem: "ID inválido." });
      }

      const sucesso = await CategoriaService.deletar(id);

      if (!sucesso) {
        return res.status(404).json({
          mensagem: "Categoria não encontrada para exclusão."
        });
      }

      return res.status(204).send();
    } catch (error) {
      return this.handleError(res, error, "Erro ao deletar categoria.");
    }
  }
}

export default new CategoriaController();
