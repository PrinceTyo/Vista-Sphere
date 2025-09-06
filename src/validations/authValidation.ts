import * as yup from "yup";

export const registerSchema = yup.object({
    username: yup.string().min(3, "Username minimal 3 karakter").required("Username wajib diisi"),
    email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
    password: yup.string().min(8, "Password minimal 8 karakter").required("Password wajib diisi"),
});

export const loginSchema = yup.object({
    email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
    password: yup.string().required("Password wajib diisi"),
});