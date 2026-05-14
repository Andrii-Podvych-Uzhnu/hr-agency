import { z } from "zod";

const objectIdSchema = z.string()
  .regex(/^[a-fA-F0-9]{24}$/, "Невалідний ідентифікатор");

const applicationItemInputSchema = z.object({
  vacancy: objectIdSchema,
  coverLetter: z.string().max(1000, "Текст занадто довгий").trim().optional(),
});

export const createApplicationSchema = z.object({
  
  user: objectIdSchema.optional(),
  items: z.array(applicationItemInputSchema)
    .min(1, "Відгук має містити хоча б одну вакансію")
    .max(10, "Максимум 10 вакансій в одному відгуку"),
  notes: z.string().max(500).trim().optional().default(""),
});

export const updateApplicationSchema = z.object({
  status: z.enum(["pending", "reviewing", "interviewing", "accepted", "rejected", "cancelled"]).optional(),
  notes:  z.string().max(500).trim().optional(),
}).refine((d) => Object.keys(d).length > 0, {
  message: "Немає даних для оновлення",
});

export const userUpdateApplicationSchema = z.object({
  status: z.literal("cancelled"),
});