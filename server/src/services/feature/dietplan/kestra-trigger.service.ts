import { DietAgentStateSchema } from "../../../utils/agent-state/dietAgentState";
import axios from "axios";
import logger from "../../../utils/logger";

export async function kestraDataResearch(state: DietAgentStateSchema) {
  logger.info("HERE WE ARE")
  const payload =
    "Hello, can you preapare a diet for someone living in london pure veg";
  //   console.log("PAYLOAD -> ", payload)

  //   const payload = req.body.data;
  logger.info("Received payload:", payload);

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

    const executionId = response.data.id;
    console.log("Kestra Execution Started", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Kestra Error:", error.response?.data || error.message);
    throw error;
  }
}
