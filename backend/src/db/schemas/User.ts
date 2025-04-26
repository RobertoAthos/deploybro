import { z } from "zod";

export const UserSchema = z.object({
  external_id: z.string().uuid().optional(),
  github_token: z.string().nullable().optional(),
  created_at: z.date().optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;