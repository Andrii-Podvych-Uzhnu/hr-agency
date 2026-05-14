import dbConnect from "@/lib/db";
import Vacancy from "@/lib/models/Vacancy";
import User from "@/lib/models/User";
import Application from "@/lib/models/Application";
import ApplicationItem from "@/lib/models/ApplicationItem";
import bcrypt from "bcryptjs";

const initialVacancies = [
  { title: "Frontend Developer", company: "TechNova", category: "IT", salary: 2500, type: "Remote", available: true },
  { title: "Backend Engineer", company: "CloudSoft", category: "IT", salary: 3000, type: "Office", available: true },
  { title: "HR Manager", company: "PeopleFirst", category: "HR", salary: 1800, type: "Hybrid", available: true },
  { title: "Security Specialist", company: "SafeGuard", category: "Security", salary: 2800, type: "Office", available: true },
  { title: "Project Manager", company: "BuildIt", category: "Management", salary: 2200, type: "Remote", available: false },
  { title: "React Developer", company: "WebFlow", category: "IT", salary: 2400, type: "Remote", available: true },
  { title: "DevOps Engineer", company: "OpsMaster", category: "IT", salary: 3500, type: "Hybrid", available: true },
  { title: "Recruiter", company: "TalentHunt", category: "HR", salary: 1500, type: "Remote", available: true },
  { title: "SOC Analyst", company: "CyberShield", category: "Security", salary: 2100, type: "Office", available: true },
  { title: "Team Lead", company: "BigCorp", category: "Management", salary: 4500, type: "Office", available: true },
];


async function seedApplication({ user, items, status, notes = "" }) {
  const application = await Application.create({
    user: user._id,
    status,
    notes,
  });

  await ApplicationItem.insertMany(
    items.map((it) => ({
      application: application._id,
      vacancy: it.vacancy._id,
      coverLetter: it.coverLetter || "Мене зацікавила ваша вакансія.",
      salaryExpectation: it.vacancy.salary, 
    }))
  );

  return application;
}

export async function GET() {
  try {
    await dbConnect();

    await Vacancy.deleteMany({});
    const vacancies = await Vacancy.create(initialVacancies);

    await User.deleteMany({});
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = await User.insertMany([
      { name: "Головний Рекрутер", email: "admin@test.com", password: hashedPassword, role: "admin" },
      { name: "Іван Кандидат", email: "user@test.com", password: hashedPassword, role: "user" },
      { name: "Олена Кравченко", email: "olena@test.com", password: hashedPassword, role: "user" },
    ]);

    await Application.deleteMany({});
    await ApplicationItem.deleteMany({});

    const [admin, user1, user2] = users;
    const [v1, v2, v3, v4, , v6, v7] = vacancies;

    
    const appsData = [
      { user: user1, items: [{ vacancy: v1 }, { vacancy: v6 }], status: "pending", notes: "Шукаю роботу на React" },
      { user: user1, items: [{ vacancy: v2 }], status: "accepted" },
      { user: user2, items: [{ vacancy: v3 }, { vacancy: v7 }], status: "interviewing", notes: "Маю досвід в HR 5 років" },
      { user: user2, items: [{ vacancy: v4 }], status: "reviewing" },
      { user: user2, items: [{ vacancy: v1 }], status: "pending" },
      { user: admin, items: [{ vacancy: v7 }], status: "accepted" }, // Адмін теж може тестувати
    ];

    for (const data of appsData) {
      await seedApplication(data);
    }

    const itemsCount = await ApplicationItem.countDocuments({});

    return Response.json({
      message: `Seed HR.agency виконано: ${vacancies.length} вакансій, ${users.length} юзерів, 6 відгуків (${itemsCount} позицій)`,
      testAccounts: [
        { email: "admin@test.com", password: "password123", role: "admin" },
        { email: "user@test.com", password: "password123", role: "user" }
      ]
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}