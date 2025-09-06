import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { loginSchema } from "@/validations/authValidation";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = await loginSchema.validate(body, {
      abortEarly: false,
    });

    await connectDB();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const { password: _, ...safeUser } = user.toObject();

    const token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      {
        message: "Login berhasil",
        token,
        user: {
          id: safeUser._id,
          username: safeUser.username,
          email: safeUser.email,
          role: safeUser.role,
        },
      },
      { status: 200 }
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
