import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório"),

  date: z
    .string()
    .min(1, "Data é obrigatória")
    .refine(
      (value) => !isNaN(Date.parse(value)),
      "Formato de data inválido"
    ),

  location: z
    .string()
    .min(1, "Local é obrigatório"),

  status: z.enum([
    "PLANNED",
    "CONFIRMED",
    "CANCELLED",
  ]),
});

// 👉 tipo inferido automaticamente (opcional, mas profissional)
export type CreateEventFormData = z.infer<
  typeof createEventSchema
>;
