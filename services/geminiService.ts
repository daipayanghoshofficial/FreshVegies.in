import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRecipeSuggestion = async (products: Product[], query?: string): Promise<string> => {
  try {
    const productList = products.map(p => p.name).join(', ');
    const userQuery = query ? `The user specifically asks: "${query}"` : "Suggest a popular Indian dish.";
    
    const prompt = `
      You are a smart culinary assistant for a vegetable shop app called FreshVegies.in.
      Here is a list of available fresh ingredients in the shop: ${productList}.
      
      ${userQuery}
      
      Based on the available ingredients, suggest a concise recipe idea. 
      Mention which ingredients from the shop can be used.
      Keep it short (under 100 words) and appetizing.
      Format the output as simple text, no markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful and cheerful shop assistant who loves cooking.",
        temperature: 0.7,
      }
    });

    return response.text || "Sorry, I couldn't come up with a recipe right now. Try picking some veggies!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI chef is currently on a break. Please try again later.";
  }
};
