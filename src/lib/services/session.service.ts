import Session from "@/lib/db/models/session";
import Question from "@/lib/db/models/question";
import { IUser } from "@/lib/db/models/user";
import { ServiceError } from "@/lib/services/auth.service";

interface QuestionInput {
  question: string;
  answer: string;
}

interface CreateSessionInput {
  role: string;
  experience: string;
  topicsToFocus: string;
  description?: string;
  questions: QuestionInput[];
}

export async function createSession(user: IUser, input: CreateSessionInput) {
  const { role, experience, topicsToFocus, description, questions } = input;

  const session = await Session.create({
    user: user._id,
    role,
    experience,
    topicsToFocus,
    description,
  });

  const questionDocs = await Promise.all(
    questions.map(async (q) => {
      const question = await Question.create({
        session: session._id,
        question: q.question,
        answer: q.answer,
      });
      return question._id;
    })
  );

  session.questions = questionDocs;
  await session.save();

  return session;
}

export async function getMySessions(userId: string) {
  return Session.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("questions");
}

export async function getSessionById(sessionId: string) {
  const session = await Session.findById(sessionId)
    .populate({
      path: "questions",
      options: { sort: { isPinned: -1, createdAt: 1 } },
    })
    .exec();

  if (!session) {
    throw new ServiceError(" session not found", 404);
  }

  return session;
}

export async function deleteSession(sessionId: string, userId: string) {
  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ServiceError("Session not found", 404);
  }

  if (session.user.toString() !== userId) {
    throw new ServiceError("not Autherized to delete this session", 401);
  }

  await Question.deleteMany({ session: session._id });
  await session.deleteOne();
}
