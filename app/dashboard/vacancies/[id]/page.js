import dbConnect from "@/lib/db";
import Vacancy from "@/lib/models/Vacancy";
import VacancyDetailClient from "@/components/VacancyDetailClient";


export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    await dbConnect();
    const vacancy = await Vacancy.findById(id).lean();
    if (!vacancy) return { title: "Вакансію не знайдено" };

    return {
      title: vacancy.title,
      description: `Актуальна вакансія: ${vacancy.title} у компанії ${vacancy.company}. Категорія: ${vacancy.category}. Дізнайтеся деталі та подайте відгук.`,
      openGraph: {
        title: `${vacancy.title} | HR.agency`,
        description: `Шукаємо спеціаліста на позицію ${vacancy.title} в компанію ${vacancy.company}.`,
      },
    };
  } catch {
    return { title: "Деталі вакансії" };
  }
}


export default async function VacancyDetailPage({ params }) {
  return <VacancyDetailClient params={params} />;
}