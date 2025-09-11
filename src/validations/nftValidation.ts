import * as yup from "yup";

const MAX_SIZE_MB = 20;
const ALLOWED_MIME = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];

export const addNFTSchema = yup.object({
  title: yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
  description: yup.string().max(2000, "Description max 2000 characters").required("Description is required"),
  price: yup
    .string()
    .matches(/^\d+(\.\d{1,18})?$/, "Price must be a valid ETH amount (max 18 decimals)")
    .required("Price is required"),
  tags: yup.array().of(yup.string().trim().min(1).max(20)).max(10, "Maximum 10 tags").optional(),
  location: yup.string().min(3, "Location too short").optional(),
  coords: yup
    .string()
    .matches(/^-?\d+\.?\d*,\s*-?\d+\.?\d*$/, "Coordinates must be lat,lng format")
    .optional(),
  country: yup.string().length(2, "Country must be 2-letter code").required("Country is required"),
  status: yup.string().oneOf(["publish", "draft"], "Status must be publish or draft").optional().default("draft"),
  file: yup
    .mixed<File>()
    .required("Image file is required")
    .test(
      "type",
      "Only JPG, JPEG, PNG, SVG allowed",
      (val) => !!val && ALLOWED_MIME.includes(val.type.toLowerCase())
    )
    .test(
      "size",
      `File must be ≤ ${MAX_SIZE_MB} MB`,
      (val) => !!val && val.size <= MAX_SIZE_MB * 1024 * 1024
    ),
});

// export const addNFTSchema = yup.object({
//   title: yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
//   description: yup.string().max(2000, "Description max 2000 characters").required("Description is required"),
//   price: yup
//     .string()
//     .matches(/^\d+(\.\d{1,18})?$/, "Price must be a valid ETH amount (max 18 decimals)")
//     .required("Price is required"),
//   tags: yup.array().of(yup.string().trim().min(1).max(20)).max(10, "Maximum 10 tags").optional(),
//   location: yup.string().min(3, "Location too short").optional(),
//   coords: yup
//     .string()
//     .matches(/^-?\d+\.?\d*,\s*-?\d+\.?\d*$/, "Coordinates must be lat,lng format")
//     .optional(),
//   country: yup.string().length(2, "Country must be 2-letter code").required("Country is required"),
//   url_original: yup.string().url("Original image URL invalid").required("Original image URL is required"),
//   url_preview: yup.string().url("Preview image URL invalid").required("Preview image URL is required"),
//   status: yup.string().oneOf(["publish", "draft"], "Status must be publish or draft").required("Status is required"),
// });
