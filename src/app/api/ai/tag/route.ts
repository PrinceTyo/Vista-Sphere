import { NextRequest, NextResponse } from "next/server";

/* model cepat & selalu warm */
const HF_URL =
  "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning";
const HF_TOKEN = process.env.HF_TOKEN!;

export async function POST(req: NextRequest) {
  console.log("🔥 AI-TAG dipanggil");

  try {
    /* 1. ambil file */
    const form = await req.formData();
    const file = form.get("file") as File;
    console.log("📁 file", file?.name, file?.size, "byte");

    if (!file) {
      console.log("❌ file kosong");
      return NextResponse.json({ tags: [] });
    }

    /* 2. kirim ke Hugging Face */
    console.log("🚀 HF_TOKEN ada?", !!HF_TOKEN);
    const res = await fetch(HF_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": file.type,
      },
      body: await file.arrayBuffer(),
    });

    console.log("📡 HF status", res.status, res.statusText);
    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    console.log("📝 HF response", data);

    /* 3. olah caption → tag */
    const caption: string = data[0]?.generated_text ?? "";
    const tags = caption
      .split(/[\s,]+/)
      .filter((t) => t.length > 2)
      .slice(0, 5);

    console.log("✅ tags", tags);
    return NextResponse.json({ tags });
  } catch (e: any) {
    console.error("❌ error AI-TAG", e.message);
    return NextResponse.json({ tags: [], error: e.message }, { status: 500 });
  }
}