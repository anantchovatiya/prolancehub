import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ✅ Correct instantiation - DO NOT override the API endpoint
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function POST(request) {
  try {

    const { description } = await request.json();

    // ✅ Use valid model ID without "models/" prefix
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    const prompt = `Given this project description: "${description}", return a valid JSON object matching this schema:

{
  "title": "Short project title",
  "type": "Type (e.g., Web App, Mobile App)",
  "timeline": number of weeks,
  "milestones": [
    {
      "phase": "Phase name",
      "startWeek": number,
      "endWeek": number,
      "duration": number,
      "tasks": ["task1", "task2"],
      "completion": number (0-100)
    }
  ],
  "risks": ["risk1", "risk2", "risk3", "risk4"],
  "resources": ["role1", "role2", "role3", "role4", "role5"]
}

Return **only** the JSON — no markdown, no extra text.`;


    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const response = await result.response;
    const text = await response.text();

    try {
      // Clean markdown-style wrapping if exists
      const cleanJson = text.replace(/^```json\s*|\s*```$/g, '').trim();
      const projectPlan = JSON.parse(cleanJson);
      return NextResponse.json(projectPlan);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.error('Raw Gemini output:', text);
      return NextResponse.json(
        { error: 'Invalid JSON format returned by Gemini.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating project plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate project plan.' },
      { status: 500 }
    );
  }
}
