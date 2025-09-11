import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
import NFT, { INFT } from "@/models/NFT";
import { addNFTInputSchema } from "@/validations/nftValidation";
import { uploadImage } from "@/lib/uploadImage";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const decoded = verify(token, JWT_SECRET) as { id: string; role: string };

    // 2. Parse FormData (Web API approach)
    const formData = await req.formData();
    
    // 3. Extract fields and file
    const fields: Record<string, any> = {};
    let file: File | null = null;
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        file = value;
      } else {
        // Handle multiple values or convert to appropriate type
        if (fields[key]) {
          // If field already exists, make it an array
          fields[key] = Array.isArray(fields[key]) 
            ? [...fields[key], value] 
            : [fields[key], value];
        } else {
          fields[key] = value;
        }
      }
    }

    // 4. Process special fields
    // Convert tags from JSON string to array if needed
    if (fields.tags && typeof fields.tags === 'string') {
      try {
        fields.tags = JSON.parse(fields.tags);
      } catch (e) {
        // If parsing fails, assume it's a comma-separated string
        fields.tags = fields.tags.split(',').map((tag: string) => tag.trim());
      }
    }

    // Remove url_original and url_preview from validation (will be auto-generated)
    const { url_original, url_preview, ...fieldsToValidate } = fields;

    // 5. Validate fields using input schema (without URL fields)
    await addNFTInputSchema.validate(fieldsToValidate, { abortEarly: false });

    // 6. Validate file
    if (!file) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }

    // 7. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 8. Upload image
    const { original, preview } = await uploadImage(
      buffer,
      file.type || "application/octet-stream"
    );

    // 9. Prepare payload for MongoDB
    const payload = {
      ...fieldsToValidate, // Use validated fields (without url_original and url_preview)
      url_original: original,
      url_preview: preview,
      creator: new mongoose.Types.ObjectId(decoded.id),
      status: (fieldsToValidate.status as "publish" | "draft") || "draft",
    };

    // 10. Save to MongoDB
    const nft = await NFT.create(payload);
    
    return NextResponse.json(nft, { status: 201 });
    
  } catch (err: any) {
  if (err.name === "ValidationError") {
    return NextResponse.json(
      { error: err.errors.join(", ") },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: err.message },
    { status: 500 }
  );
}
}