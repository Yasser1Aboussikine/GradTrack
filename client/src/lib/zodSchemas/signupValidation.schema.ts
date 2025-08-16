import { z } from "zod";
import profileInfoSchema from "./profileInfo.schema";
import academicInfoSchema from "./academicInfo.schema";
import accountInfoSchema from "./accountInfo.schema";

export const signUpSchema = (validMajorsForSchool: number[]) =>
  z.object({
    accountInfo: accountInfoSchema,
    profileInfo: profileInfoSchema,
    academicInfo: academicInfoSchema(validMajorsForSchool),
  });

export type SignupFormData = z.infer<ReturnType<typeof signUpSchema>>;

export default signUpSchema;