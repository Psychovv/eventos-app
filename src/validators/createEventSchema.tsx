import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório"),

  date: z
    .string()
    .min(10, "Data incompleta") 
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

export type CreateEventFormData = z.infer<typeof createEventSchema>;