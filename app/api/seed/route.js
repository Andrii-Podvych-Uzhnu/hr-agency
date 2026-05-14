import dbConnect from '@/lib/db';
import Vacancy from '@/lib/models/Vacancy'; 

const initialVacancies = [
  {
    title: "Senior Front-End Developer (React)",
    company: "TechNova Solutions",
    category: "IT",
    salary: 120000,
    type: "Remote",
    description: "Шукаємо досвідченого фронтенд розробника для роботи над міжнародним фінтех-проєктом. Глибоке знання React, Next.js та TypeScript обов'язкове. Пропонуємо гнучкий графік та медичне страхування.",
    available: true,
  },
  {
    title: "Project Manager",
    company: "BuildRight Global",
    category: "Management",
    salary: 75000,
    type: "Office",
    description: "Керування командою з 15+ осіб, планування спринтів, тісна комунікація з B2B клієнтами. Вимагається досвід роботи за методологією Agile/Scrum від 3 років та англійська на рівні Upper-Intermediate.",
    available: true,
  },
  {
    title: "HR Business Partner",
    company: "Staffing Pro UK",
    category: "HR",
    salary: 60000,
    type: "Hybrid",
    description: "Повний цикл рекрутингу для технічних відділів, онбординг новачків, проведення 1-to-1 зустрічей, вирішення конфліктних ситуацій та організація щоквартальних тімбілдінгів.",
    available: true,
  },
  {
    title: "Cyber Security Analyst",
    company: "DefendIT",
    category: "Security",
    salary: 95000,
    type: "Remote",
    description: "Моніторинг систем безпеки клієнтів, виявлення вразливостей, проведення пентестів та запобігання кібератакам. Наявність сертифікатів (наприклад, CISSP або CEH) буде значною перевагою.",
    available: true,
  },
  {
    title: "Junior QA Engineer (Manual)",
    company: "PixelPerfect",
    category: "IT",
    salary: 25000,
    type: "Office",
    description: "Ручне тестування веб-додатків, написання тест-кейсів та баг-репортів у Jira. Ідеальна можливість для старту кар'єри в IT. Готові взяти студента останніх курсів.",
    available: false, 
  }
];

export async function GET() {
  try {
    
    await dbConnect();

    await Vacancy.deleteMany({});

    
    const vacancies = await Vacancy.create(initialVacancies);

    // 4. Повертаємо результат
    return Response.json({
      message: `Базу успішно наповнено! Створено ${vacancies.length} вакансій.`,
      data: vacancies
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}