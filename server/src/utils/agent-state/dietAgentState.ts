import { z } from "zod";

export const DietAgentStateSchema = z.object({
  prompt: z.string(),
  extracted: z.any().nullable(),
  missingFields: z.array(z.string()).nullable(),
  isContentValid: z.boolean().nullable(),
  iteration: z.number().default(0),

  kestraResult: z.any().nullable(),
  finalPlan: z.any().nullable(),
});

export type DietAgentStateSchema = z.infer<typeof DietAgentStateSchema>;
