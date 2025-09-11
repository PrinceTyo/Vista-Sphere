import mongoose, { Schema, Document, models } from "mongoose";

export interface INFT extends Document {
  title: string;
  description: string;
  price: string;
  tags?: string[];
  location?: string;
  coords?: string;
  country: string;
  url_original: string;
  url_preview: string;
  status: "publish" | "draft";
  creator: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NFTSchema = new Schema<INFT>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    tags: [{ type: String, trim: true }],
    location: { type: String },
    coords: { type: String },
    country: { type: String, required: true },
    url_original: { type: String, required: true },
    url_preview: { type: String, required: true },
    status: { type: String, enum: ["publish", "draft"], default: "draft" },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const NFT = models.NFT || mongoose.model<INFT>("NFT", NFTSchema);
export default NFT;