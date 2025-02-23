import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnimalDetails } from "../types/animals";
import { config } from "../app/config";

const genAI = new GoogleGenerativeAI(config.apiKey);

export async function getAnimalInformation(animalName: string): Promise<AnimalDetails> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  console.log('Starting API call for:', animalName);

  const prompt = `
    قم بتوفير معلومات مفصلة عن ${animalName} باللغة العربية. يجب تنظيم المعلومات بالشكل التالي:

    [FEEDING]
    معلومات عن التغذية المناسبة والأعلاف المطلوبة.

    [CARE]
    معلومات عن العناية اليومية والرعاية العامة.

    [HEALTH]
    معلومات عن الرعاية الصحية والوقاية من الأمراض.

    [HOUSING]
    معلومات عن السكن المناسب والبيئة المطلوبة.

    [BREEDING]
    معلومات عن التربية والتكاثر.

    [DISEASES]
    معلومات عن الأمراض الشائعة وطرق علاجها.

    [MEDICATIONS]
    معلومات عن الأدوية والعلاجات الضرورية.

    [BEHAVIOR]
    معلومات عن السلوك والتدريب.

    [ECONOMICS]
    معلومات عن الجدوى الاقتصادية.

    [VACCINATION]
    معلومات عن التطعيمات المطلوبة.

    [END]

    ملاحظة: يجب الحفاظ على العلامات [SECTION] كما هي بالضبط في الإجابة.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Raw API Response:', text);

    // Default message if section not found
    const defaultMessage = 'جاري تحميل المعلومات...';

    // Helper function to extract section with better error handling
    const extractSectionSafely = (startMarker: string, endMarker: string): string => {
      try {
        const startIndex = text.indexOf(startMarker);
        if (startIndex === -1) {
          console.log(`Section ${startMarker} not found`);
          return defaultMessage;
        }

        const contentStart = startIndex + startMarker.length;
        const contentAfterStart = text.slice(contentStart);
        const endIndex = contentAfterStart.indexOf(endMarker);

        if (endIndex === -1) {
          const content = contentAfterStart.trim();
          return content || defaultMessage;
        }

        const content = contentAfterStart.slice(0, endIndex).trim();
        return content || defaultMessage;
      } catch (err) {
        console.error(`Error extracting section ${startMarker}:`, err);
        return defaultMessage;
      }
    };

    const details: AnimalDetails = {
      feeding: extractSectionSafely('[FEEDING]', '[CARE]'),
      care: extractSectionSafely('[CARE]', '[HEALTH]'),
      health: extractSectionSafely('[HEALTH]', '[HOUSING]'),
      housing: extractSectionSafely('[HOUSING]', '[BREEDING]'),
      breeding: extractSectionSafely('[BREEDING]', '[DISEASES]'),
      diseases: extractSectionSafely('[DISEASES]', '[MEDICATIONS]'),
      medications: extractSectionSafely('[MEDICATIONS]', '[BEHAVIOR]'),
      behavior: extractSectionSafely('[BEHAVIOR]', '[ECONOMICS]'),
      economics: extractSectionSafely('[ECONOMICS]', '[VACCINATION]'),
      vaccination: extractSectionSafely('[VACCINATION]', '[END]')
    };

    // Validate that we have at least some real content
    const hasContent = Object.values(details).some(value => value !== defaultMessage);
    if (!hasContent) {
      throw new Error('لم يتم العثور على معلومات كافية');
    }

    return details;

  } catch (error: unknown) {
    console.error('API Error:', error);
    if (error instanceof Error && error.message.includes('API_KEY')) {
      throw new Error('خطأ في مفتاح API. يرجى التحقق من المفتاح.');
    }
    throw new Error('فشل في الحصول على المعلومات. يرجى المحاولة مرة أخرى.');
  }
} 