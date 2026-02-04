import { AppDataSource } from "../database/data-source.js";
import { Categoria } from "../entities/Categoria.js";
import type { ICriarCategoria, IAtualizarCategoria } from '../validates/categoria.js';
import { Repository } from "typeorm";

const categoriaRepository: Repository<Categoria> =
  AppDataSource.getRepository(Categoria);

class CategoriaService {

  async criar(dados: ICriarCategoria): Promise<Categoria> {

    const categoriaExistente = await categoriaRepository.findOneBy({
      nome: dados.nome
    });

    if (categoriaExistente) {
      throw new Error(`A categoria '${dados.nome}' já está cadastrada.`);
    }

    const novaCategoria = categoriaRepository.create({
      nome: dados.nome,
      ...(dados.descricao && { descricao: dados.descricao })
    });

    await categoriaRepository.save(novaCategoria);

    return novaCategoria;
  }

  async listarTodas(): Promise<Categoria[]> {
    return categoriaRepository.find();
  }

  async buscarPorId(id: string): Promise<Categoria | null> {
    return categoriaRepository.findOneBy({ id });
  }

  async atualizar(
    id: string,
    dados: IAtualizarCategoria
  ): Promise<Categoria | null> {

    const categoria = await categoriaRepository.findOneBy({ id });

    if (!categoria) return null;

    if (dados.nome && dados.nome !== categoria.nome) {
      const categoriaExistente = await categoriaRepository.findOneBy({
        nome: dados.nome
      });

      if (categoriaExistente) {
        throw new Error(
          `O novo nome '${dados.nome}' já está em uso por outra categoria.`
        );
      }
    }

    const dadosAtualizados: Partial<Categoria> = {
      ...(dados.nome && { nome: dados.nome }),
      ...(dados.descricao && { descricao: dados.descricao })
    };

    categoriaRepository.merge(categoria, dadosAtualizados);
    await categoriaRepository.save(categoria);

    return categoria;
  }

  async deletar(id: string): Promise<boolean> {
    const resultado = await categoriaRepository.delete(id);
    return (resultado.affected ?? 0) > 0;
  }
}

export default new CategoriaService();
