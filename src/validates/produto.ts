import { z } from 'zod';

const precoSchema = z.coerce
  .number()
  .gt(0, "O preço deve ser maior que zero.");

const estoqueSchema = z.coerce
  .number()
  .int("O estoque deve ser um número inteiro.")
  .gte(0, "O estoque não pode ser negativo.");

const categoriaIdSchema = z.string()
  .uuid("O ID da categoria deve ser um UUID válido.");

export const CriarProdutoSchema = z.object({
  nome: z.string()
    .trim()
    .min(1, "O nome do produto é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(150, "O nome deve ter no máximo 150 caracteres."),

  descricao: z.string()
    .trim()
    .max(500, "A descrição deve ter no máximo 500 caracteres.")
    .optional(),

  preco: precoSchema,
  estoque: estoqueSchema,
  categoriaId: categoriaIdSchema
});

export type ICriarProduto = z.infer<typeof CriarProdutoSchema>;

export const AtualizarProdutoSchema = CriarProdutoSchema.partial();

export type IAtualizarProduto = z.infer<typeof AtualizarProdutoSchema>;
