import { z } from "zod";

export const RepositorySchema = z.object({
  external_id: z.string().uuid().optional(),
  user_id: z.string(),
  github_repo: z.string(),
  branch_homolog: z.string(),
  branch_production: z.string(),
  slack_channel_id: z.string().nullable().optional(),
});

export type RepositorySchemaType = z.infer<typeof RepositorySchema>;