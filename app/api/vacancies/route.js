import dbConnect from "@/lib/db";
import Vacancy from "@/lib/models/Vacancy"; 
import { authorize } from "@/lib/authorize"; 


export async function GET() {
  await dbConnect();
  try {
    const vacancies = await Vacancy.find({}).sort({ createdAt: -1 });
    return Response.json(vacancies);
  } catch (err) {
    return Response.json({ error: "Помилка отримання даних" }, { status: 500 });
  }
}


export async function POST(request) {
  
  const { error } = await authorize("admin");
  if (error) return error; 

  await dbConnect();
  try {
    const data = await request.json();
    const vacancy = await Vacancy.create(data);
    return Response.json(vacancy, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Помилка створення вакансії" }, { status: 400 });
  }
}