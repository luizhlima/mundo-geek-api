import { AppDataSource } from "../database/data-source.js";
import { Produto } from "../entities/Produto.js";
import { Categoria } from "../entities/Categoria.js";
import type { IAtualizarProduto, ICriarProduto } from "../validates/produto.js";
import { Repository } from "typeorm";

const produtoRepository: Repository<Produto> =
  AppDataSource.getRepository(Produto);

const categoriaRepository: Repository<Categoria> =
  AppDataSource.getRepository(Categoria);

class ProdutoService {

  private async verificarCategoria(categoriaId: string): Promise<Categoria> {
    const categoria = await categoriaRepository.findOneBy({ id: categoriaId });

    if (!categoria) {
      throw new Error(`Categoria com ID ${categoriaId} não encontrada.`);
    }

    return categoria;
  }

  async criar(dados: ICriarProduto): Promise<Produto> {
    await this.verificarCategoria(dados.categoriaId);

    const novoProduto = produtoRepository.create({
      nome: dados.nome,
      preco: dados.preco,
      estoque: dados.estoque,
      categoriaId: dados.categoriaId,
      ...(dados.descricao && { descricao: dados.descricao })
    });

    await produtoRepository.save(novoProduto);

    return (await produtoRepository.findOne({
      where: { id: novoProduto.id },
      relations: ['categoria']
    }))!;
  }

  async listarTodas(): Promise<Produto[]> {
    return produtoRepository.find({
      relations: ['categoria']
    });
  }

  async buscarPorId(id: string): Promise<Produto | null> {
    return produtoRepository.findOne({
      where: { id },
      relations: ['categoria']
    });
  }

  async atualizar(
    id: string,
    dados: IAtualizarProduto
  ): Promise<Produto | null> {

    const produto = await produtoRepository.findOneBy({ id });

    if (!produto) return null;

    if (dados.categoriaId) {
      await this.verificarCategoria(dados.categoriaId);
    }

    const dadosAtualizados: Partial<Produto> = {
      ...(dados.nome && { nome: dados.nome }),
      ...(dados.descricao && { descricao: dados.descricao }),
      ...(typeof dados.preco === 'number' && { preco: dados.preco }),
      ...(typeof dados.estoque === 'number' && { estoque: dados.estoque }),
      ...(dados.categoriaId && { categoriaId: dados.categoriaId })
    };

    produtoRepository.merge(produto, dadosAtualizados);
    await produtoRepository.save(produto);

    return this.buscarPorId(produto.id);
  }

  async deletar(id: string): Promise<boolean> {
    const resultado = await produtoRepository.delete(id);
    return (resultado.affected ?? 0) > 0;
  }
}

export default new ProdutoService();
