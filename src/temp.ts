import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function getImages() {
  const prompts = [
    "3D stylized character like The Sims, a taxi driver looking frustrated next to his yellow taxi car on a city street, bright colors, isometric view, high quality render",
    "3D stylized character like The Sims, a female cafe owner standing behind a counter with a coffee machine and a cash register, looking worried, bright colors, high quality render",
    "3D stylized character like The Sims, a man holding a paper bill standing in front of a modern apartment building, bright colors, high quality render",
    "3D stylized character like The Sims, a male engineer in a blue shirt working on a laptop at a desk with papers, looking secretive, bright colors, high quality render",
    "3D stylized character like The Sims, an elderly man standing on a large empty green plot of land with a small wooden sign, bright colors, high quality render"
  ];

  // I will just use the tool in the next turn to generate these.
}
