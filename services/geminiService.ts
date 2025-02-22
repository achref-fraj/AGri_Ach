import { GoogleGenerativeAI } from "@google/generative-ai";
import { CropDetails } from "../types/agriculture";

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    console.log('API Key:', "AIzaSyCf9FX860zsS6cpXllKyX1uyBPQRE3CDM4"); // temporary debug log
    this.genAI = new GoogleGenerativeAI("AIzaSyCf9FX860zsS6cpXllKyX1uyBPQRE3CDM4"!);
  }

  async getCropInformation(cropName: string, language: string = 'ar'): Promise<CropDetails> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

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
      // This is a simple implementation - you might want to make it more sophisticated
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
} 