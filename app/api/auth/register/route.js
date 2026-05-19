import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; 
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/validations/user";

export async function POST(request) {
  try {
    await dbConnect();

    const data = await request.json();

    const result = registerSchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return NextResponse.json(
        { error: messages.join(", ") },
        { status: 400 }
      );
    }

    const { email, password, name } = result.data;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Користувач з таким email вже існує" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, 
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Користувача успішно створено",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Помилка реєстрації:", error); 
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Користувач з таким email вже існує" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}