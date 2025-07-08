const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();

    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/, "")
      .trim();

    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON Parse Error:", cleanedText);
      return res.status(500).json({
        message: "Failed to parse Gemini response. Output was not valid JSON.",
        error: err.message,
        raw: rawText,
      });
    }

    res.status(200).json({ questions: parsedData });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();

    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON Parse Error:", cleanedText);
      return res.status(500).json({
        message: "Invalid AI response format. Could not parse JSON.",
        error: err.message,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
