import { StateGraph, START, END } from "@langchain/langgraph";
import { ingredientAgentStateSchema } from "../agent-state/IngredientAgentState";
import { extractedIngredient } from "../../services/feature/ingredient-scan/extract-ingredient.service";
import { researchNode } from "../../services/feature/ingredient-scan/research-node.service";

export const ingredientGraph = new StateGraph(ingredientAgentStateSchema)
  .addNode("extract", extractedIngredient)
  .addNode("research", researchNode)
  .addEdge(START, "extract")
  .addEdge("extract", "research")
  .addEdge("research", END)
  .compile();
