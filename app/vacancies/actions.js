"use server";

import dbConnect from "@/lib/db";
import Application from "@/lib/models/Application";
import ApplicationItem from "@/lib/models/ApplicationItem";
import Vacancy from "@/lib/models/Vacancy";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function applyToVacancy(vacancyId) {
  
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Ви не авторизовані. Будь ласка, увійдіть у систему.");
  }

  await dbConnect();

  
  const vacancy = await Vacancy.findById(vacancyId);
  if (!vacancy) {
    throw new Error("Вакансію не знайдено в базі даних");
  }

  let createdAppId = null;

  try {
    
    const application = await Application.create({
      user: session.user.id,
      notes: `Відгук в один клік з головної сторінки`,
      status: "pending" 
    });
    
    createdAppId = application._id;

  
    await ApplicationItem.create({
      application: application._id,
      vacancy: vacancyId,
      coverLetter: "Кандидат зацікавлений у цій вакансії.",
      salaryExpectation: vacancy.salary || 0
    });

   
    if (application.items) {
      application.items.push(vacancyId);
      await application.save();
    }

    return { success: true };

  } catch (error) {
    console.error("🔥 КРИТИЧНА ПОМИЛКА БАЗИ ДАНИХ:", error);
    if (createdAppId) {
      await Application.deleteOne({ _id: createdAppId });
    }
    throw new Error(error.message || "Помилка запису в базу даних");
  }
}