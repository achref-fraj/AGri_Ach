import { config } from "../app/config";
import { CropDetails } from "../types/agriculture";

// Replace the genAI initialization with fetch implementation
async function generateContent(prompt: string) {
  const response = await fetch(`${config.API_URL}?key=${config.apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Export the function directly
export async function getCropInformation(cropName: string, language: string = 'ar'): Promise<CropDetails> {
  const prompt = `
    Please provide detailed agricultural information about ${cropName}. Format your response exactly as follows, with clear section separators:

    [PLANTING_GUIDE]
    Provide detailed planting instructions and best seasons.

    [HARVESTING_GUIDE]
    Provide specific harvesting techniques and timing.

    [WEATHER_CONSIDERATIONS]
    Detail weather and climate requirements.

    [FERTILIZERS]
    List recommended fertilizers and soil requirements.

    [BEST_PRACTICES]
    Explain best cultivation practices.

    [DISEASE_MANAGEMENT]
    Describe common diseases and their management.

    [PEST_CONTROL]
    Detail pest control methods.

    [WATER_MANAGEMENT]
    Explain irrigation needs and techniques.

    [SOIL_PREPARATION]
    Describe soil preparation methods.

    [STORAGE_GUIDELINES]
    Provide storage and handling instructions.

    [MARKET_VALUE]
    Discuss economic value and market considerations.

    [ENVIRONMENTAL_IMPACT]
    Explain environmental considerations.

    [ORGANIC_FARMING]
    Detail organic farming methods for ${cropName}, including:
    - Natural fertilizers
    - Pest control without chemicals
    - Soil management
    - Certification requirements
    - Benefits of organic farming

    [END]

    Please provide all information in ${language} language, being specific to ${cropName}.
  `;

  try {
    const text = await generateContent(prompt);
    console.log('Full response:', text);
    
    // Parse sections using markers
    const sections = {
      plantingGuide: extractSection(text, '[PLANTING_GUIDE]', '[HARVESTING_GUIDE]'),
      harvestingGuide: extractSection(text, '[HARVESTING_GUIDE]', '[WEATHER_CONSIDERATIONS]'),
      weatherConsiderations: extractSection(text, '[WEATHER_CONSIDERATIONS]', '[FERTILIZERS]'),
      fertilizers: extractSection(text, '[FERTILIZERS]', '[BEST_PRACTICES]'),
      bestPractices: extractSection(text, '[BEST_PRACTICES]', '[DISEASE_MANAGEMENT]'),
      diseaseManagement: extractSection(text, '[DISEASE_MANAGEMENT]', '[PEST_CONTROL]'),
      pestControl: extractSection(text, '[PEST_CONTROL]', '[WATER_MANAGEMENT]'),
      waterManagement: extractSection(text, '[WATER_MANAGEMENT]', '[SOIL_PREPARATION]'),
      soilPreparation: extractSection(text, '[SOIL_PREPARATION]', '[STORAGE_GUIDELINES]'),
      storageGuidelines: extractSection(text, '[STORAGE_GUIDELINES]', '[MARKET_VALUE]'),
      marketValue: extractSection(text, '[MARKET_VALUE]', '[ENVIRONMENTAL_IMPACT]'),
      environmentalImpact: extractSection(text, '[ENVIRONMENTAL_IMPACT]', '[ORGANIC_FARMING]'),
      organicFarming: extractSection(text, '[ORGANIC_FARMING]', '[END]')
    };
    
    // Log the extracted organic farming section
    console.log('Organic farming section:', sections.organicFarming);
    
    // If organic farming section is empty, provide a default response
    if (!sections.organicFarming) {
      sections.organicFarming = `طرق الزراعة العضوية ل${cropName}:
      - استخدام الأسمدة الطبيعية
      - المكافحة الحيوية للآفات
      - إدارة التربة بشكل طبيعي
      - تجنب المواد الكيميائية
      - الحفاظ على التوازن البيئي`;
    }

    // Add the crop name to the returned sections
    return {
      name: cropName,
      ...sections
    };
  } catch (error) {
    console.error('Error getting crop information:', error);
    throw error;
  }
}

// Make the extraction more robust
function extractSection(text: string, startMarker: string, endMarker: string): string {
  const start = text.indexOf(startMarker);
  if (start === -1) return '';
  
  const actualStart = start + startMarker.length;
  const searchStart = text.slice(actualStart);
  const end = searchStart.indexOf(endMarker);
  
  if (end === -1) {
    // If no end marker, take until the end of text
    return searchStart.trim();
  }
  
  return searchStart.slice(0, end).trim();
} 