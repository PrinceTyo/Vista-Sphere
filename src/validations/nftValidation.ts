import * as yup from "yup";

export const addNFTInputSchema = yup.object({
  title: yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
  description: yup.string().max(2000, "Description max 2000 characters").required("Description is required"),
  price: yup.string().matches(/^\d+(\.\d{1,18})?$/, "Price must be a valid ETH amount (max 18 decimals)").required("Price is required"),
  tags: yup.array().of(yup.string().trim().min(1).max(20)).max(10, "Maximum 10 tags").required("Tags are required"),
  location: yup.string().min(3, "Location too short").required("Location is required"),
  coords: yup.string().matches(/^-?\d+\.?\d*,\s*-?\d+\.?\d*$/, "Coordinates must be lat,lng format").required("Coordinates are required"),
  country: yup.string().length(2, "Country must be 2-letter code").required("Country is required"),
  status: yup.string().oneOf(["publish", "draft"], "Status must be publish or draft").optional().default("draft"),
});

export const addNFTSchema = yup.object({
  title: yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
  description: yup.string().max(2000, "Description max 2000 characters").required("Description is required"),
  price: yup.string().matches(/^\d+(\.\d{1,18})?$/, "Price must be a valid ETH amount (max 18 decimals)").required("Price is required"),
  tags: yup.array().of(yup.string().trim().min(1).max(20)).max(10, "Maximum 10 tags").required("Tags are required"),
  location: yup.string().min(3, "Location too short").required("Location is required"),
  coords: yup.string().matches(/^-?\d+\.?\d*,\s*-?\d+\.?\d*$/, "Coordinates must be lat,lng format").required("Coordinates are required"),
  country: yup.string().length(2, "Country must be 2-letter code").required("Country is required"),
  url_original: yup.string().url("Original image URL invalid").required("Original image URL is required"),
  url_preview: yup.string().url("Preview image URL invalid").required("Preview image URL is required"),
  status: yup.string().oneOf(["publish", "draft"], "Status must be publish or draft").required("Status is required"),
});
