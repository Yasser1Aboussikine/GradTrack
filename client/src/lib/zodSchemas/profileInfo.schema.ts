import { z } from "zod";

const profileInfoSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+212|0)([5-7]\d{9})$/,
      "Invalid Moroccan phone number (must be 10 digits)"
    )
    .optional()
    .or(z.literal("")),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  birthDate: z.date().optional(),
});

export default profileInfoSchema;
