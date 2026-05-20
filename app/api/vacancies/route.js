import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Vacancy from "@/lib/models/Vacancy";
import { authorize } from "@/lib/authorize";
import { createVacancySchema } from "@/lib/validations/vacancy";
import { sanitizeObject } from "@/lib/sanitize";


export async function GET() {
  try {
    await dbConnect();

    // Сортуємо вакансії: спочатку новіші (за датою створення)
    const vacancies = await Vacancy.find({}).sort({ createdAt: -1 });

    return NextResponse.json(vacancies, { status: 200 });
  } catch (err) {
    console.error("Помилка GET /api/vacancies:", err);
    return NextResponse.json({ error: "Помилка сервера при отриманні вакансій" }, { status: 500 });
  }
}


export async function POST(request) {
  const { error } = await authorize("admin");
  if (error) return error;

  await dbConnect();

  try {
    const data = await request.json();

    const result = createVacancySchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return NextResponse.json({ errors: messages }, { status: 400 });
    }

    const sanitized = sanitizeObject(result.data);
    const vacancy = await Vacancy.create(sanitized);

    return NextResponse.json(vacancy, { status: 201 });
  } catch (err) {
    console.error("Помилка POST /api/vacancies:", err);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}