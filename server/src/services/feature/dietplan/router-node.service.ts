import { DietAgentStateSchema } from "../../../utils/agent-state/dietAgentState";

export async function routerNode(state: DietAgentStateSchema) {
  if (state.isContentValid) {
    return "research";
  }
  return "END";
}
