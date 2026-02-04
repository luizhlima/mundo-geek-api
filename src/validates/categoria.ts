import { z } from 'zod';

export const CriarCategoriaSchema = z.object({
  nome: z.string()
    .trim()
    .min(1, "O nome da categoria é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),

  descricao: z.string()
    .trim()
    .max(255, "A descrição deve ter no máximo 255 caracteres.")
    .optional()
});

export type ICriarCategoria = z.infer<typeof CriarCategoriaSchema>;

export const AtualizarCategoriaSchema = CriarCategoriaSchema.partial();

export type IAtualizarCategoria = z.infer<typeof AtualizarCategoriaSchema>;
