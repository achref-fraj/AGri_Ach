import { GoogleGenerativeAI } from "@google/generative-ai";
import { CropDetails } from "../types/agriculture";
import { config } from "../app/config";

// Create a single instance of GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(config.apiKey);

// Export the function directly
export async function getCropInformation(cropName: string, language: string = 'ar'): Promise<CropDetails> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Please provide comprehensive agricultural information about ${cropName} in the following categories:
    1. Planting guide and best seasons (including soil preparation and planting methods)
    2. Harvesting techniques and optimal timing
    3. Weather and climate requirements (including temperature, humidity, and rainfall needs)
    4. Fertilizers and soil requirements (including organic and chemical options)
    5. Best practices for cultivation
    6. Disease management and prevention
    7. Pest control methods (including organic solutions)
    8. Water management and irrigation techniques
    9. Soil preparation and maintenance
    10. Storage and post-harvest handling
    11. Market value and economic considerations
    12. Environmental impact and sustainability
    13. Organic farming methods
    
    Please provide detailed, practical information in ${language} language, focusing on sustainable and modern agricultural practices.
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
      diseaseManagement: sections[5] || '',
      pestControl: sections[6] || '',
      waterManagement: sections[7] || '',
      soilPreparation: sections[8] || '',
      storageGuidelines: sections[9] || '',
      marketValue: sections[10] || '',
      environmentalImpact: sections[11] || '',
      organicFarming: sections[12] || '',
    };
  } catch (error) {
    console.error('Error getting crop information:', error);
    throw error;
  }
} 