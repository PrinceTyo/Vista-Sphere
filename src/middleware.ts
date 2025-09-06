import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  // 1. CORS untuk development (opsional)
  const res = NextResponse.next();
  res.headers.append("Access-Control-Allow-Origin", "*");
  res.headers.append("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 2. Proteksi API /api/admin/*
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const decoded = verify(token, JWT_SECRET) as any;
      if (decoded.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  // 3. Redirect jika user belum login saat akses /admin/*
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      verify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};