import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ingredientAgentState } from "../../../utils/agent-state/IngredientAgentState";
import config from "../../../config/config";

const client = new ChatOpenAI({
  model: "gpt-4.1",
  openAIApiKey: config.OPENAI_API_KEY,
});

export async function extractedIngredient(state: ingredientAgentState) {
  const img = state.imgUrl;
  const SYSTEM_INSTRUCTION = `
      You will receive an image as input. 
      Your job as an expert food image scanner is:
      1. Check if the image is clear or blurry. 
      2. If blurry, respond with: { "isPhotoClear": false }
      3. If clear, extract ALL ingredients appearing in the image.
      4. Return JSON: 
        {
          "isPhotoClear": true,
          "ingredients": [...]
        }
    `;

  try {
    const response = await client.invoke([
      new SystemMessage(`
You will receive an image as input. 
      Your job as an expert food image scanner is:
      1. Check if the image is clear or blurry. 
      2. If blurry, respond with: { "isPhotoClear": false }
      3. If clear, extract ALL ingredients appearing in the image.
      4. Return JSON: 
        {
          "isPhotoClear": true,
          "ingredients": [...]
        }
  `),
      new HumanMessage({
        content: [
          { type: "text", text: "Extract all ingredients from this image." },
          {
            type: "image_url",
            image_url: { url: state.imgUrl }, // <-- Correct
          },
        ],
      }),
    ]);

    console.log("RESPONSE -> ", response.content);
    return {
      ...state,
      extractedIngredient: response.content,
    };
  } catch (error) {
    console.log("error ai ", error);
  }
}

//  You are image scanner expert, you have 1000 years of experience from reading books, talking to people, understanding science and ayurveda. You have very deep knowledge about science, ayurveda and food. If you get a list of ingredients then you can immediately tell if the product is good or bad, you can also tell the quality of ingridents. If a products has 50 different ingredient then you can tell okay this are 50 ingredients out of this x are harmful checmical and then you have to research on web check what are the reviews of the product across the internet scrap everything check what WHO is saying about the ingredients and what top reputed health experts are saying and accordingly make a respone.
