import { z } from "zod";

// Pass valid major IDs dynamically
export const academicInfoSchema = (validMajorsForSchool: number[]) =>
  z.object({
    schoolId: z.number().positive({ message: "School is required" }),

    majorId: z
      .number({ message: "Major is required" })
      .refine((val) => validMajorsForSchool.includes(val), {
        message: "Selected major is not valid for the chosen school",
      }),

    minor: z
      .enum([
        "Buisness Administration",
        "Psychologie",
        "Mathematics",
        "individual Minor"
      ])
      .optional(),
    academicTranscript: z
      .union([
        z.instanceof(File, {
          message: "Please Upload your unofficial transcript as a PDF file",
        }),
        z.null(),
      ])
      .refine(
        (file) => {
          if (file === null) return true;
          return file.type === "application/pdf";
        },
        {
          message: "Only PDF files are allowed",
        }
      )
      .refine(
        (file) => {
          if (file === null) return true;
          return file.size <= 15 * 1024 * 1024;
        },
        {
          message: "File is too large (15MB is the limit)",
        }
      ),
  });

export default academicInfoSchema;
