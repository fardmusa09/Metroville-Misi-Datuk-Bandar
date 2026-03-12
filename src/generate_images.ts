import { GoogleGenAI } from "@google/genai";

async function generateThematicImages() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const prompts = [
    { id: 'roadtax', prompt: 'A 3D stylized character like The Sims, a taxi driver looking frustrated next to his yellow taxi car on a city street, bright colors, isometric view, high quality render.' },
    { id: 'sst', prompt: 'A 3D stylized character like The Sims, a female cafe owner standing behind a counter with a coffee machine and a cash register, looking worried, bright colors, high quality render.' },
    { id: 'property', prompt: 'A 3D stylized character like The Sims, a man holding a paper bill standing in front of a modern apartment building, bright colors, high quality render.' },
    { id: 'income', prompt: 'A 3D stylized character like The Sims, a male engineer in a blue shirt working on a laptop at a desk with papers, looking secretive, bright colors, high quality render.' },
    { id: 'land', prompt: 'A 3D stylized character like The Sims, an elderly man standing on a large empty green plot of land with a small wooden sign, bright colors, high quality render.' }
  ];

  const results: Record<string, string> = {};

  for (const p of prompts) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: p.prompt }] },
      config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } }
    });

    for (const part of response.candidates![0].content.parts) {
      if (part.inlineData) {
        results[p.id] = `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }

  console.log(JSON.stringify(results));
}

generateThematicImages();
