import dbConnect from "@/lib/db";
import Vacancy from "@/lib/models/Vacancy";
import { authorize } from "@/lib/authorize";


export async function PUT(request, { params }) {
  const { error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;
  try {
    const data = await request.json();
    const vacancy = await Vacancy.findByIdAndUpdate(id, data, { new: true });
    return Response.json(vacancy);
  } catch (err) {
    return Response.json({ error: "Помилка оновлення" }, { status: 400 });
  }
}


export async function DELETE(request, { params }) {
  const { error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;
  try {
    await Vacancy.findByIdAndDelete(id);
    return Response.json({ message: "Видалено" });
  } catch (err) {
    return Response.json({ error: "Помилка видалення" }, { status: 400 });
  }
}