import { z } from "zod";
import { DeployStatus } from "../../types/deployStatusOptions";

export const DeployScheduleSchema = z.object({
  external_id: z.string().uuid().optional(),
  repo_id: z.string(),
  branch: z.string(),
  scheduled_for: z.date(),
  message: z.string().nullable().optional(),
  status: z.nativeEnum(DeployStatus),
  github_run_url: z.string().nullable().optional(),
  aws_console_url: z.string().nullable().optional(),
  created_at: z.date().optional(),
});

export type DeployScheduleSchemaType = z.infer<typeof DeployScheduleSchema>;