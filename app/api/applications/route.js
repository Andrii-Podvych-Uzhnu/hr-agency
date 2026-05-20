import dbConnect from "@/lib/db";
import Application from "@/lib/models/Application";
import ApplicationItem from "@/lib/models/ApplicationItem";
import Vacancy from "@/lib/models/Vacancy";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";
import { createApplicationSchema } from "@/lib/validations/application";
import { sanitizeObject } from "@/lib/sanitize";

void [User, Vacancy, ApplicationItem];

export async function GET(request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const vacancyId = searchParams.get("vacancy");

  const filter = session.user.role === "admin" ? {} : { user: session.user.id };
  if (status) filter.status = status;

  if (vacancyId) {
    const appIds = await ApplicationItem.find({ vacancy: vacancyId }).distinct("application");
    filter._id = { $in: appIds };
  }

  
  const rawApplications = await Application.find(filter)
    .populate({ path: "user", select: "name email role" })
    .sort({ createdAt: -1 });

  
  const applications = await Promise.all(
    rawApplications.map(async (app) => {
      const items = await ApplicationItem.find({ application: app._id })
        .populate({ path: "vacancy", select: "title company category salary" });
      
      const appObj = app.toObject();
      return {
        ...appObj,
        items: items || [] 
      };
    })
  );

  return Response.json(applications);
}

export async function POST(request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();
  let createdAppId = null;

  try {
    const data = await request.json();
    const result = createApplicationSchema.safeParse(data);
    if (!result.success) {
      return Response.json({ errors: result.error.errors.map(e => e.message) }, { status: 400 });
    }

    const sanitized = sanitizeObject(result.data);

    let appUserId = session.user.id;
    if (session.user.role === "admin" && sanitized.user) {
      const target = await User.findById(sanitized.user);
      if (!target) return Response.json({ error: "Користувача не знайдено" }, { status: 404 });
      appUserId = target._id;
    }

    const vIds = sanitized.items.map(i => i.vacancy);
    const dbVacancies = await Vacancy.find({ _id: { $in: vIds } });
    const vMap = new Map(dbVacancies.map(v => [v._id.toString(), v]));

    for (const item of sanitized.items) {
      const v = vMap.get(item.vacancy);
      if (!v || !v.available) {
        return Response.json({ error: `Vacancy not found or closed: ${item.vacancy}` }, { status: 404 });
      }
    }

    const application = await Application.create({
      user: appUserId,
      notes: sanitized.notes
    });
    createdAppId = application._id;

    const itemsToCreate = sanitized.items.map(item => ({
      application: application._id,
      vacancy: item.vacancy,
      coverLetter: item.coverLetter,
      salaryExpectation: vMap.get(item.vacancy).salary 
    }));
    await ApplicationItem.insertMany(itemsToCreate);

   
    const createdItems = await ApplicationItem.find({ application: application._id }).populate("vacancy");
    const populated = application.toObject();
    populated.items = createdItems;

    return Response.json(populated, { status: 201 });

  } catch (err) {
    if (createdAppId) await Application.deleteOne({ _id: createdAppId });
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}