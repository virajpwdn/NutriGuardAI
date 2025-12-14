import { DietAgentStateSchema } from "../../../utils/agent-state/dietAgentState";
import { ChatOpenAI } from "@langchain/openai";
import config from "../../../config/config";

const client = new ChatOpenAI({
  model: "gpt-4.1-nano",
  temperature: 0,
  openAIApiKey: config.OPENAI_API_KEY,
});

export async function feedbackNode(state: DietAgentStateSchema) {
  const SYSTEM_PROMPT = `
        We are building a diet plan for user. Before building a diet plan we are asking them few questions like what is your favourite food, location, workout time, age, height, weight, etc. so that we can give them accurate results. But all of this fields we check in the inital query and we extracted missing fields which users didn't give in initial prompt. So your job is that you will receive a array which will consists of missing fields means this items are missing and we need this to make a accurate diet plan so can you make a nice question which will be sent to frontend.
    `;

  const missingFieldsInfo = state.missingFields
    ? `The missing fields are: ${state.missingFields.join(", ")}`
    : "There are no missing fields.";
  const response = await client.invoke([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "human", content: missingFieldsInfo },
  ]);

  console.log("FEEDBACK RESPONSE -> ", response.content)
  console.log("INSIDE FEEDBACK NODE")
  return {
    ...state,
    feedback: response.content
    
  }
}
