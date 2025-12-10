import { StateGraph, START, END } from "@langchain/langgraph";
import { DietAgentStateSchema } from "../agent-state/dietAgentState";
import { extractFieldNodes } from "../../services/feature/dietplan/openai-extract.service";
import { kestraDataResearch } from "../../services/feature/dietplan/kestra-trigger.service";
import { feedbackNode } from "../../services/feature/dietplan/feedback-node.service";

export const graph = new StateGraph(DietAgentStateSchema)
  .addNode("extract", extractFieldNodes)
  .addNode("research", kestraDataResearch)
  .addNode("generate_feedback", feedbackNode)

  .addEdge(START, "extract")

  .addConditionalEdges("extract", (state) => {
    return state.isContentValid ? "research" : "generate_feedback";
  })

  .addEdge("research", "generate_feedback")
  .addEdge("generate_feedback", END)

  .compile();
