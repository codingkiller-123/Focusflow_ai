import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is required');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

export async function getProductivityTips(userRecentActivity: string): Promise<string[]> {
  try {
    const ai = getGemini();
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Based on this recent user activity: ${userRecentActivity}, give 3 very short, actionable productivity tips (max 1 sentence each) to help them focus better. Return as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching tips:", error);
    return [
      "Try using the Pomodoro technique for 25 minutes of focus.",
      "Put your phone in another room while working.",
      "Take a 5-minute break to stretch."
    ];
  }
}
