// app/api/seed/route.js
import dbConnect from "@/lib/db";
import Vacancy from "@/lib/models/Vacancy"; 
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  await dbConnect();

  
  await Vacancy.deleteMany({});
  await User.deleteMany({});

 
  const vacancies = await Vacancy.insertMany([
    {
      title: "Frontend Developer (React)",
      company: "Tech Solutions",
      category: "IT",
      salary: 60000,
      available: true,
      description: "Шукаємо крутого розробника для роботи над HR-платформою."
    },
    {
      title: "Recruiter",
      company: "HR.agency",
      category: "HR",
      salary: 30000,
      available: true,
      description: "Потрібна людина, яка вміє знаходити таланти."
    }
  ]);

 
  const hashedPassword = await bcrypt.hash("password123", 10);

  
  const users = await User.insertMany([
    {
      name: "Головний Адмін",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
    },
    {
      name: "Звичайний Рекрутер",
      email: "user@test.com",
      password: hashedPassword,
      role: "user",
    },
  ]);

  return Response.json({
    message: "Базу HR.agency оновлено (Seed успішний)",
    vacanciesCreated: vacancies.length,
    usersCreated: users.length,
    testAccounts: [
      { email: "admin@test.com", password: "password123", role: "admin" },
      { email: "user@test.com", password: "password123", role: "user" },
    ],
  });
}