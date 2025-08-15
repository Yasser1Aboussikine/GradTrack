import { z } from "zod";

export const signUpSchema = z.object({

  major : z.string()

});