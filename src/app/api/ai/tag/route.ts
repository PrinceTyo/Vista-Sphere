import { NextRequest, NextResponse } from "next/server";

const HF_URL =
  "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base";
const HF_TOKEN = process.env.HF_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    // 1. ambil file dari FormData
    const form = await req.formData();
    const file = form.get("file") as File;
    if (!file) return NextResponse.json({ tags: [] });

    // 2. kirim binary ke Hugging Face
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": file.type,
      },
      body: await file.arrayBuffer(), // ← tanpa stream, tanpa duplex
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    const caption: string = data[0]?.generated_text ?? "";
    const tags = caption
      .split(/[\s,]+/)
      .filter((t) => t.length > 2)
      .slice(0, 5);

    return NextResponse.json({ tags });
  } catch (e: any) {
    return NextResponse.json({ tags: [], error: e.message }, { status: 500 });
  }
}