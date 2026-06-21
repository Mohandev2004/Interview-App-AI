import Question from "@/lib/db/models/question";
import Session from "@/lib/db/models/session";
import { ServiceError } from "@/lib/services/auth.service";

interface QuestionInput {
  question: string;
  answer: string;
}

export async function addQuestionsToSession(
  sessionId: string,
  questions: QuestionInput[]
) {
  if (!sessionId || !questions || !Array.isArray(questions)) {
    throw new ServiceError("In valide input data", 400);
  }

  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ServiceError("Session not found", 404);
  }

  const createdQuestions = await Question.insertMany(
    questions.map((q) => ({
      session: sessionId,
      question: q.question,
      answer: q.answer,
    }))
  );

  session.questions.push(...createdQuestions.map((q) => q._id));
  await session.save();

  return createdQuestions;
}

export async function togglePinQuestion(questionId: string) {
  const question = await Question.findById(questionId);

  if (!question) {
    throw new ServiceError("Question not found", 404);
  }

  question.isPinned = !question.isPinned;
  await question.save();

  return question;
}

export async function updateQuestionNote(questionId: string, note?: string) {
  const question = await Question.findById(questionId);

  if (!question) {
    throw new ServiceError("Question not found", 404);
  }

  question.note = note || "";
  await question.save();

  return question;
}
