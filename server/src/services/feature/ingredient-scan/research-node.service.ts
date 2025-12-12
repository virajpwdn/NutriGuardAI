import axios from "axios";
import {
  ingredientAgentState,
  ingredientAgentStateSchema,
} from "../../../utils/agent-state/IngredientAgentState";
import logger from "../../../utils/logger";

export async function researchNode(state: ingredientAgentState) {
  try {
    const payload = state.extractedIngredient;
    const formated = JSON.stringify(payload).replace(/[\n\r]/g, "\\n");

    console.log("PAYLOAD", formated);

    const webhookUrl =
      "http://localhost:8080/api/v1/executions/webhook/ingredient.scan/ingredient/4wjtkzwVGBM9yKnjm3yv8r";

    const response = await axios.post(
      webhookUrl,
      {
        payload: formated,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("OUTPUT ", response.data)k
    return response.data;
  } catch (error: any) {
    console.error("Kestra Error:", error.response?.data || error.message);
    throw error;
  }
}
