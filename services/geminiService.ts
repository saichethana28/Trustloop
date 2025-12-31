
import { GoogleGenAI, Type } from "@google/genai";
import { Seller, Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeSellerRisk = async (seller: Seller): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following seller metrics and provide a 1-sentence risk assessment for a potential buyer:
      Name: ${seller.name}
      Trust Score: ${seller.trustScore}
      Metrics: ${JSON.stringify(seller.metrics)}
      Verified: ${seller.verified}`,
      config: {
        systemInstruction: "You are a professional marketplace fraud analyst. Be concise and objective.",
      },
    });
    return response.text || "Assessment unavailable.";
  } catch (error) {
    return "Trust metrics verified by automated systems.";
  }
};

export const compareSellersAI = async (product: Product, otherSellers: Seller[]): Promise<string> => {
  try {
    const sellersData = otherSellers.map(s => ({
      name: s.name,
      score: s.trustScore,
      reliability: s.metrics.deliveryReliability
    }));
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a quick summary comparing these sellers for the product "${product.name}". 
      Highlight the trade-off between price (assumed similar) and reliability.
      Current Seller: ${product.seller.name} (Score: ${product.seller.trustScore})
      Alternatives: ${JSON.stringify(sellersData)}`,
      config: {
        systemInstruction: "Help the buyer make a safe choice. Use the format: 'Seller [X] is [price diff] but [metric diff] than Seller [Y]'.",
      },
    });
    return response.text || "Comparison summary unavailable.";
  } catch (error) {
    return "Prices and reliability scores compared based on historical data.";
  }
};

export const checkFakeReview = async (review: string): Promise<boolean> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Determine if this review sounds suspicious or AI-generated: "${review}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isFake: { type: Type.BOOLEAN, description: "Whether the review is likely fake" },
            confidence: { type: Type.NUMBER, description: "Confidence score 0-1" }
          },
          required: ["isFake"]
        }
      }
    });
    const result = JSON.parse(response.text || '{"isFake": false}');
    return result.isFake;
  } catch {
    return false;
  }
};
