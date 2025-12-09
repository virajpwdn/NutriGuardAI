import { StateGraph, START, END } from "@langchain/langgraph";
import { DietAgentStateSchema } from "../agent-state/dietAgentState";
import { extractFieldNodes } from "../../services/tools/openai-extract.service";

export const graph = new StateGraph(DietAgentStateSchema)
  .addNode("extract", extractFieldNodes)
  .addEdge(START, "extract")
  .addEdge("extract", END)
  .compile();
