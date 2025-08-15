import { z } from "zod";

const profileInfo = z.object({
  fullName: z.string().min(6, "name is too short"),
  phoneNumber: z
    .string()
    .regex(/^(?:\+212|0)([5-7]\d{8})$/, "Invalid Moroccan phone number")
    .optional(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  birthDate: z.coerce.date().optional(),
});

export default profileInfo;