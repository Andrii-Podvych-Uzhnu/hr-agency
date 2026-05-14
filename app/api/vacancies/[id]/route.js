import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Vacancy from "@/lib/models/Vacancy";
import { authorize } from "@/lib/authorize";
import { updateVacancySchema } from "@/lib/validations/vacancy"; 
import { sanitizeObject } from "@/lib/sanitize"; 

export async function PUT(request, { params }) {
  
  const { error } = await authorize("admin");
  if (error) return error;

  await dbConnect();

  try {
    
    const { id } = await params;
    const data = await request.json();

   
    const result = updateVacancySchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return NextResponse.json({ errors: messages }, { status: 400 });
    }

    
    const sanitized = sanitizeObject(result.data);

    
    const vacancy = await Vacancy.findByIdAndUpdate(id, sanitized, {
      new: true,
      runValidators: true,
    });

    if (!vacancy) {
      return NextResponse.json(
        { error: "Вакансію не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(vacancy);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}