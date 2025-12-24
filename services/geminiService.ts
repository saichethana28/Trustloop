
import { GoogleGenAI, Type } from "@google/genai";
import { Review } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Analyzes reviews to detect patterns, sentiment, and potential fake signals.
   */
  async analyzeReviews(reviews: Review[]) {
    const prompt = `Analyze the following customer reviews for a marketplace seller. 
    1. Identify key sentiment (positive/negative/neutral).
    2. Extract major pros and cons.
    3. Detect any signals that suggest reviews might be fake (e.g., repetitive phrasing, overly generic praise).
    
    Reviews:
    ${reviews.map(r => `[Rating: ${r.rating}] "${r.comment}"`).join('\n')}
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sentiment: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              fakeSignals: { type: Type.STRING },
              summary: { type: Type.STRING }
            },
            required: ["sentiment", "summary"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      return { summary: "Analysis unavailable at this time." };
    }
  },

  /**
   * Generates a "Trust Score" explanation based on seller metrics.
   */
  async generateRiskIndicator(sellerMetrics: any) {
    const prompt = `Based on these seller metrics, provide a concise risk prediction for a buyer. 
    Metrics: ${JSON.stringify(sellerMetrics)}`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      return "Unable to predict risk at the moment.";
    }
  }
};
