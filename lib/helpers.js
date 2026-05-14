import dbConnect from "./db";
import Vacancy from "./models/Vacancy";
import Application from "./models/Application";

/**
 
 */
export async function getVacancyStats() {
  await dbConnect();

  const [total, available, result] = await Promise.all([
    Vacancy.countDocuments({}),
    Vacancy.countDocuments({ available: true }),
    Vacancy.aggregate([
      {
        $group: {
          _id: null,
          avgSalary: { $avg: "$salary" },
          categories: { $addToSet: "$category" },
        },
      },
    ]),
  ]);

  const stats = result[0] || { avgSalary: 0, categories: [] };

  return {
    total,
    available,
    unavailable: total - available,
    avgSalary: Math.round(stats.avgSalary) || 0,
    categoriesCount: stats.categories.length,
  };
}

/**
 
 */
export async function getApplicationStats() {
  await dbConnect();

  const [total, pending, reviewing, completed] = await Promise.all([
    Application.countDocuments({}),
    Application.countDocuments({ status: "pending" }),
    Application.countDocuments({ status: "reviewing" }),
    Application.countDocuments({ status: "accepted" }),
  ]);

  return {
    total,
    pending,
    reviewing,
    completed,
  };
}