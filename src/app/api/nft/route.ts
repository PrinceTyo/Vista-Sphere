import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
import NFT from "@/models/NFT";
import { addNFTSchema } from "@/validations/nftValidation";
import { uploadImage } from "@/lib/uploadImage";

const JWT_SECRET = process.env.JWT_SECRET!;

/* ---------- helper ---------- */
function parseFormData(fd: FormData) {
  const fields: Record<string, any> = {};
  let file: File | null = null;

  for (const [k, v] of fd.entries()) {
    if (v instanceof File) file = v;
    else {
      fields[k] = fields[k]       
        ? Array.isArray(fields[k])
          ? [...fields[k], v]
          : [fields[k], v]
        : v;
    }
  }
  return { fields, file };
}

function normalizeTags(raw: any): string[] {
  if (Array.isArray(raw)) return raw.map((t: string) => t.trim());
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw).map((t: string) => t.trim());
    } catch {
      return raw.split(",").map((t: string) => t.trim());
    }
  }
  return [];
}

/* ---------- POST ---------- */
export async function POST(req: NextRequest) {
  try {
    /* 1. Auth */
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = verify(token, JWT_SECRET) as { id: string; role: string };

    /* 2. Parse FormData */
    const { fields, file } = parseFormData(await req.formData());

    /* 3. Siapkan input untuk Yup */
    const input = {
      ...fields,
      tags: normalizeTags(fields.tags),
      file, // <- akan divalidasi oleh addNFTSchema
    };

    /* 4. Validasi sekaligus (field + file) */
    const validated = await addNFTSchema.validate(input, { abortEarly: false });

    /* 5. Upload gambar */
    const buffer = Buffer.from(await validated.file.arrayBuffer());
    const { original, preview } = await uploadImage(buffer, validated.file.type);

    /* 6. Simpan ke MongoDB */
    const nft = await NFT.create({
      ...validated,
      url_original: original,
      url_preview: preview,
      creator: new mongoose.Types.ObjectId(decoded.id),
      status: validated.status || "draft",
    });

    return NextResponse.json(nft, { status: 201 });
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