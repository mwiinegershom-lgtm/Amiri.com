import { GoogleGenAI, Type } from '@google/genai';
import { products } from '../data/products';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getVibeRecommendations(prompt: string, imageBase64?: string, mimeType?: string) {
  const model = 'gemini-3-flash-preview';
  
  const catalogContext = `
    Here is our current catalog of AMIRI products:
    ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, category: p.category, description: p.description })), null, 2)}
  `;

  const systemInstruction = `
    You are an elite luxury fashion stylist for AMIRI. 
    The user will provide a "vibe" via text and optionally an image (like a mood board or celebrity photo).
    Your job is to curate a 2 to 3 piece outfit from the provided catalog that perfectly matches the requested vibe.
    Return a JSON object containing a 'curationTitle', a 'curationDescription' explaining why these pieces work together for the vibe, and an array of 'productIds'.
  `;

  const parts: any[] = [
    { text: catalogContext },
    { text: `User's requested vibe: ${prompt}` }
  ];

  if (imageBase64 && mimeType) {
    parts.push({
      inlineData: {
        data: imageBase64,
        mimeType: mimeType
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            curationTitle: { type: Type.STRING, description: "A catchy title for the curated outfit" },
            curationDescription: { type: Type.STRING, description: "Stylist's explanation of the outfit" },
            productIds: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Array of product IDs from the catalog"
            }
          },
          required: ["curationTitle", "curationDescription", "productIds"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Error fetching vibe recommendations:", error);
    throw error;
  }
}

export async function predictSize(userBrand: string, userSize: string, amiriCategory: string) {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are an expert luxury fashion tailor and sizing specialist.
    The user will provide a brand they currently wear, their size in that brand, and the category of AMIRI clothing they are looking to buy (e.g., Denim, Footwear, Tops).
    AMIRI sizing can be specific (e.g., denim runs skinny, footwear is true to size European).
    Provide a recommended AMIRI size and a brief, confident explanation.
  `;

  const prompt = `I wear size ${userSize} in ${userBrand}. What size should I take in AMIRI ${amiriCategory}?`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedSize: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["recommendedSize", "explanation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Error predicting size:", error);
    throw error;
  }
}
