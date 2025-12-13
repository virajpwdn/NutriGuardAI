import { z } from "zod";

export const ingredientAgentStateSchema = z.object({
  accuracy: z.number().nullable(),
  isPhotoClear: z.boolean(),
  extractedIngredient: z.any().nullable(),
  feedbackMessage: z.string().nullable(),
  formattedOutput: z.any().nullable(),
  imgUrl: z.string().nullable(),
});

export type ingredientAgentState = z.infer<typeof ingredientAgentStateSchema>;
