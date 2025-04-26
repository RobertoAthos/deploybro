import { z } from "zod";

export const SlackChannelSchema = z.object({
  external_id: z.string().uuid().optional(),
  channel_name: z.string(),
  channel_id: z.string(),
});

export type SlackChannelSchemaType = z.infer<typeof SlackChannelSchema>;