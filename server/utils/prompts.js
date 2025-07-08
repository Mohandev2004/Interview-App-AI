const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} year(s)
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- Include small code blocks if relevant.
- Keep formatting clean and clear.

📌 Strict Output Format:
Return ONLY a valid JSON array. Do NOT include markdown backticks (\`\`\`) or language tags (e.g., json).

Example:
[
  {
    "question": "What is useState in React?",
    "answer": "useState is a Hook that lets you add state to functional components. Example: const [count, setCount] = useState(0);"
  },
  ...
]
`;

const conceptExplainPrompt = (question) => `
You are an AI trained to explain technical interview concepts clearly.

Task:
- Provide a detailed explanation for the following question: "${question}"
- Make it easy to understand for beginner developers.
- Include small code examples if needed.
- Add a short and clear "title" field summarizing the concept.

📌 Strict Output Format:
Return ONLY a valid JSON object. Do NOT use markdown formatting (no backticks, no "json").

Example:
{
  "title": "React useState Hook",
  "explanation": "useState is a React Hook that allows you to add state to functional components..."
}
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};
