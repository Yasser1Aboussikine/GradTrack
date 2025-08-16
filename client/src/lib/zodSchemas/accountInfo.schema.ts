import { z } from "zod";

const accountInfoSchema = z
  .object({
    firstName: z.string().min(1, "First Name is REQUIRED"),
    lastName: z.string().min(1, "Last Name is REQUIRED"),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+(\.[a-zA-Z0-9._%+-]+)+@aui\.ma$/,
        "Email must be in the format f.lastname@aui.ma"
      ),
    password: z
      .string()
      .min(6, "Password too short")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and a number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export default accountInfoSchema;