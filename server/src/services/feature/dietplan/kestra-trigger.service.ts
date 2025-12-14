import { DietAgentStateSchema } from "../../../utils/agent-state/dietAgentState";
import axios from "axios";
import logger from "../../../utils/logger";

export async function kestraDataResearch(state: DietAgentStateSchema) {
  const payload =
    "Hello, can you preapare a diet for someone living in london pure veg";
  //   console.log("PAYLOAD -> ", payload)

  //   const payload = req.body.data;

  try {
    const webhookUrl =
      "http://localhost:8080/api/v1/executions/webhook/ai.diet/diet_research_workflow/4wjtkzwVGBM9yKnjm3yv8r";

    const response = await axios.post(
      webhookUrl,
      {
        payload: JSON.stringify(payload),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("INSIDE RESEARCH NODE")
    return {
      ...state,
      kestraDataResearch: response.data
    };
  } catch (error: any) {
    console.error("Kestra Error:", error.response?.data || error.message);
    throw error;
  }
}
