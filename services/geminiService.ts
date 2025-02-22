import { GoogleGenerativeAI } from "@google/generative-ai";
import { CropDetails } from "../types/agriculture";
import { config } from "../app/config";

// Create a single instance of GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(config.apiKey);

// Export the function directly
export async function getCropInformation(cropName: string, language: string = 'ar'): Promise<CropDetails> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Please provide detailed agricultural information about ${cropName} in the following categories:
    1. Planting guide and best seasons
    2. Harvesting techniques and timing
    3. Weather considerations and climate requirements
    4. Recommended fertilizers and soil requirements
    5. Best practices for cultivation
    
    Please provide the response in ${language} language.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response into structured data
    const sections = text.split('\n\n');
    
    return {
      plantingGuide: sections[0] || '',
      harvestingGuide: sections[1] || '',
      weatherConsiderations: sections[2] || '',
      fertilizers: sections[3] || '',
      bestPractices: sections[4] || '',
    };
  } catch (error) {
    console.error('Error getting crop information:', error);
    throw error;
  }
} 