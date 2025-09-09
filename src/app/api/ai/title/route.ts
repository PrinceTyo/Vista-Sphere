// app/api/ai/title/route.ts
import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN!);

// helper untuk captioning dengan fallback
async function generateCaption(image: Blob | ArrayBuffer): Promise<string> {
  const models = [
    "nlpconnect/vit-gpt2-image-captioning", // model utama
    "Salesforce/blip-image-captioning-large", // fallback 1
    "Salesforce/blip-image-captioning-base", // fallback 2
  ];

  for (const model of models) {
    try {
      console.log(`🚀 mencoba model: ${model}`);
      const result = await hf.imageToText({
        model,
        data: image, // ✅ langsung ArrayBuffer / Blob
      });

      if (result?.generated_text) {
        return result.generated_text;
      }
    } catch (err: any) {
      console.warn(`⚠️ gagal dengan model ${model}:`, err.message);
      continue; // coba model berikutnya
    }
  }

  throw new Error("Tidak ada model yang tersedia untuk captioning");
}

export async function POST(req: NextRequest) {
  console.log("🔥 HF-JS TITLE dipanggil");

  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    console.log("📁 file", file?.name, file?.size, "byte");

    if (!file || file.size > 500_000) {
      console.log("❌ file kosong / > 500 KB");
      return NextResponse.json({ title: "" });
    }

    // ✅ langsung pakai file (Blob)
    const text = await generateCaption(file);

    const title = text.length > 60 ? text.substring(0, 57) + "..." : text;

    console.log("✅ title", title);
    return NextResponse.json({ title });
  } catch (e: any) {
    console.error("❌ HF-JS error", e.message);
    return NextResponse.json({ title: "", error: e.message }, { status: 500 });
  }
}
