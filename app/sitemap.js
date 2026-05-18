// app/sitemap.js
import dbConnect from "@/lib/db";
import Vacancy from "@/lib/models/Vacancy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {

  const staticRoutes = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  let dynamicRoutes = [];
  try {
    await dbConnect();
    
    const vacancies = await Vacancy.find({ available: true }).select("_id updatedAt").lean();
    
    dynamicRoutes = vacancies.map((vacancy) => ({
      url: `${siteUrl}/dashboard/vacancies/${vacancy._id}`, 
      lastModified: vacancy.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Помилка під час генерації sitemap:", error);
    
  }

  return [...staticRoutes, ...dynamicRoutes];
}