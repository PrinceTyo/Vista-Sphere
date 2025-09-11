import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

const ORIGINAL_DIR = path.join(process.cwd(), "uploads", "images", "original");
const PREVIEW_DIR = path.join(process.cwd(), "uploads", "images", "preview");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

export async function uploadImage(file: Buffer, mimetype: string) {
  await ensureDir(ORIGINAL_DIR);
  await ensureDir(PREVIEW_DIR);

  const id = uuid();
  const ext = mimetype.split("/")[1];
  const originalName = `${id}.${ext}`;
  const originalPath = path.join(ORIGINAL_DIR, originalName);

  await fs.writeFile(originalPath, file);

  const previewName = `${id}.avif`;
  const previewPath = path.join(PREVIEW_DIR, previewName);

  try {
    await sharp(file)
      .resize(600, undefined, { withoutEnlargement: true })
      .toFormat("avif", { quality: 80 })
      .toFile(previewPath);
  } catch {
    // Fallback WebP jika AVIF error
    const fallbackName = `${id}.webp`;
    const fallbackPath = path.join(PREVIEW_DIR, fallbackName);
    await sharp(file)
      .resize(600, undefined, { withoutEnlargement: true })
      .toFormat("webp", { quality: 80 })
      .toFile(fallbackPath);
    return {
      original: `/uploads/images/original/${originalName}`,
      preview: `/uploads/images/preview/${fallbackName}`,
    };
  }

  return {
    original: `/uploads/images/original/${originalName}`,
    preview: `/uploads/images/preview/${previewName}`,
  };
}