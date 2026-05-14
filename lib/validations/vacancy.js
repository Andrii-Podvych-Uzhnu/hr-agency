import { z } from "zod";

export const createVacancySchema = z.object({
  title: z
    .string({ required_error: "Назва посади обов'язкова" })
    .min(3, "Назва посади має бути не менше 3 символів")
    .max(100, "Максимум 100 символів")
    .trim(),
  company: z
    .string({ required_error: "Назва компанії обов'язкова" })
    .min(2, "Назва компанії занадто коротка")
    .trim(),
  description: z
    .string()
    .min(10, "Опис має бути інформативним (мін. 10 символів)")
    .max(2000, "Опис занадто довгий")
    .trim(),
  salary: z
    .number({
      required_error: "Зарплата обов'язкова",
      invalid_type_error: "Зарплата має бути числом",
    })
    .min(0, "Зарплата не може бути від'ємною"),
  category: z.enum(["IT", "HR", "Marketing", "Sales", "Other"], {
    errorMap: () => ({
      message: "Оберіть категорію: IT, HR, Marketing, Sales або Other",
    }),
  }),
  available: z.boolean().optional().default(true),
});


export const updateVacancySchema = createVacancySchema.partial();