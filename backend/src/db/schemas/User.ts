import { z } from "zod";

export const UserSchema = z.object({
  full_name: z.string(),
  github_token: z.string()
});

export type UserSchemaType = z.infer<typeof UserSchema>;