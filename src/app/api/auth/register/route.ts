import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { registerSchema } from "@/validations/authValidation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password } = await registerSchema.validate(body, {
      abortEarly: false,
    });

    await connectDB();

    const exist = await User.findOne({ email });
    if (exist) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}