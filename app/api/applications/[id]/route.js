import dbConnect from "@/lib/db";
import Application from "@/lib/models/Application";
import User from "@/lib/models/User";
import Vacancy from "@/lib/models/Vacancy";
import ApplicationItem from "@/lib/models/ApplicationItem";
import { authorize } from "@/lib/authorize";
import { updateApplicationSchema, userUpdateApplicationSchema } from "@/lib/validations/application";
import { sanitizeObject } from "@/lib/sanitize";

void [Vacancy, User, ApplicationItem];

export async function GET(request, { params }) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const app = await Application.findById(id)
      .populate({ path: "user", select: "name email role" })
      .populate({ path: "items", populate: { path: "vacancy" } });

    if (!app) return Response.json({ error: "Not Found" }, { status: 404 });

    const isOwner = app.user?._id?.toString() === session.user.id;
    if (session.user.role !== "admin" && !isOwner) {
      return Response.json({ error: "Access Denied" }, { status: 403 });
    }

    return Response.json(app);
  } catch {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const app = await Application.findById(id);
    if (!app) return Response.json({ error: "Not Found" }, { status: 404 });

    const isAdmin = session.user.role === "admin";
    const isOwner = app.user.toString() === session.user.id;
    if (!isAdmin && !isOwner) return Response.json({ error: "Access Denied" }, { status: 403 });

    const body = await request.json();
    const schema = isAdmin ? updateApplicationSchema : userUpdateApplicationSchema;
    const result = schema.safeParse(body);

    if (!result.success) return Response.json({ errors: result.error.errors.map(e => e.message) }, { status: 400 });

    if (!isAdmin && app.status !== "pending") {
      return Response.json({ error: "Only pending applications can be cancelled" }, { status: 409 });
    }

    const updated = await Application.findByIdAndUpdate(id, sanitizeObject(result.data), { new: true })
      .populate({ path: "user", select: "name email" })
      .populate({ path: "items", populate: { path: "vacancy" } });

    return Response.json(updated);
  } catch {
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    
    const deleted = await Application.findByIdAndDelete(id);
    if (!deleted) return Response.json({ error: "Not Found" }, { status: 404 });
    return Response.json({ message: "Application deleted" });
  } catch {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
}