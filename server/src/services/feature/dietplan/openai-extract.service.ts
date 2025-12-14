import { ChatOpenAI } from "@langchain/openai";
import config from "../../../config/config";

const client = new ChatOpenAI({
  model: "gpt-4.1-nano",
  temperature: 0,
  openAIApiKey: config.OPENAI_API_KEY,
});

export async function extractFieldNodes(state: any) {
  const SYSTEM_PROMPT = `
         You are an input extractor for a diet plan.
    Extract ONLY structured fields. If a field is missing, do NOT guess.
    Return ONLY valid JSON in a single line with no additional text:
    {
      goalType,
      cuisine,
      dietaryPreference,
      allergies,
      workoutTime,
      age,
      height,
      weight
    }
    `;

  const query = state.prompt;

  const result = await client.invoke([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "human", content: query },
  ]);

  console.log("RESULTS FROM LLM => " + result);

  try {
    const extracted = JSON.parse(result.content.toString());
    console.log("EXTRACTED CONETNT => " + extracted);

    const missing = Object.keys(extracted).filter(
      (k) => extracted[k] === null || extracted[k] === "" || extracted[k] === null
    );

    console.log("MISSING => " + missing);

    return {
      ...state,
      extracted,
      missingFields: missing.length ? missing : null,
      isContentValid: missing.length === 0,
      iteration: state.iteration + (!state.isContentValid ? 1 : 0),
    };
  } catch (error) {
    console.error("JSON parse error:", error);
    console.error("Failed content:", result.content.toString());
    // Return with error indication
    return {
      ...state,
      extracted: null,
      error: "Failed to parse LLM response as JSON",
      missingFields: null,
      isContentValid: false,
      iteration: state.iteration + 1,
    };
  }
}
