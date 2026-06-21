import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "@/lib/ai/prompts";
import { ServiceError } from "@/lib/services/auth.service";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new ServiceError(
      "Gemini API key is not configured. Set GEMINI_API_KEY in your environment.",
      500
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: GEMINI_MODEL });
}

function toGeminiServiceError(error: unknown): ServiceError {
  const message = error instanceof Error ? error.message : "Gemini request failed";

  if (/API key was reported as leaked/i.test(message)) {
    return new ServiceError(
      "Your Gemini API key was revoked by Google. Create a new key at https://aistudio.google.com/apikey and update GEMINI_API_KEY.",
      500
    );
  }

  if (/429|quota|rate limit/i.test(message)) {
    return new ServiceError(
      "Gemini rate limit reached. Wait a minute and try again, or check your quota in Google AI Studio.",
      429
    );
  }

  if (/404|not found|not supported for generateContent/i.test(message)) {
    return new ServiceError(
      `Gemini model "${GEMINI_MODEL}" is unavailable. Set GEMINI_MODEL to a supported model (e.g. gemini-2.0-flash).`,
      500
    );
  }

  return new ServiceError(message, 500);
}

function cleanJsonText(rawText: string): string {
  return rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/, "")
    .trim();
}

export async function generateInterviewQuestions(input: {
  role: string;
  experience: string | number;
  topicsToFocus: string;
  numberOfQuestions: number;
}) {
  const { role, experience, topicsToFocus, numberOfQuestions } = input;

  if (
    !role?.trim() ||
    experience === undefined ||
    experience === null ||
    experience === "" ||
    !topicsToFocus?.trim() ||
    !numberOfQuestions
  ) {
    throw new ServiceError("Missing Required Fields", 400);
  }

  const prompt = questionAnswerPrompt(
    role,
    String(experience),
    topicsToFocus,
    numberOfQuestions
  );

  let rawText: string;
  try {
    const result = await getGeminiModel().generateContent(prompt);
    rawText = result.response.text();
  } catch (error) {
    throw toGeminiServiceError(error);
  }
  const cleanedText = cleanJsonText(rawText);

  try {
    const parsedData = JSON.parse(cleanedText);
    return { questions: parsedData };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Parse error";
    throw new ServiceError(
      `Failed to parse Gemini response. Output was not valid JSON. ${message}`,
      500
    );
  }
}

export async function generateConceptExplanation(question: string) {
  if (!question) {
    throw new ServiceError("Missing required fields", 400);
  }

  const prompt = conceptExplainPrompt(question);

  let rawText: string;
  try {
    const result = await getGeminiModel().generateContent(prompt);
    rawText = result.response.text();
  } catch (error) {
    throw toGeminiServiceError(error);
  }
  const cleanedText = cleanJsonText(rawText);

  try {
    return JSON.parse(cleanedText);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Parse error";
    throw new ServiceError(
      `Invalid AI response format. Could not parse JSON. ${message}`,
      500
    );
  }
}
