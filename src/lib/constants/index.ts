import type { AppFeature, CardBgItem } from "@/types";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    GET_PROFILE: "/api/auth/profile",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/upload",
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions",
    GENERATE_EXPLANATION: "/api/ai/generate-explanation",
  },

  INTERVIEW: {
    CREATE: "/api/interview/create",
    GET_ALL: "/api/interview/my-session",
    GET_ONE: (id: string) => `/api/interview/${id}`,
    DELETE: (id: string) => `/api/interview/${id}`,
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add",
    PIN: (id: string) => `/api/questions/${id}/pin`,
    UPLOAD_NOTE: (id: string) => `/api/questions/${id}/note`,
  },
} as const;

export const CARD_BG: CardBgItem[] = [
  { id: 1, bgcolor: "linear-gradient(135deg, #e6f8f3 0%, #f7fcfa 100%)" },
  { id: 2, bgcolor: "linear-gradient(135deg, #fef9e7 0%, #fffdf4 100%)" },
  { id: 3, bgcolor: "linear-gradient(135deg, #eaf7ff 0%, #f3fbff 100%)" },
  { id: 4, bgcolor: "linear-gradient(135deg, #fff2e9 0%, #fff8f3 100%)" },
  { id: 5, bgcolor: "linear-gradient(135deg, #e7f6fe 0%, #f4fafd 100%)" },
  { id: 6, bgcolor: "linear-gradient(135deg, #f5f5f5 0%, #fbfbfb 100%)" },
  { id: 7, bgcolor: "linear-gradient(135deg, #fff4fc 0%, #fff8fd 100%)" },
  { id: 8, bgcolor: "linear-gradient(135deg, #e8fef3 0%, #f5fef8 100%)" },
  { id: 9, bgcolor: "linear-gradient(135deg, #f0ecff 0%, #f7f5ff 100%)" },
  { id: 10, bgcolor: "linear-gradient(135deg, #fef2f2 0%, #fff8f8 100%)" },
];

export const App_FEATURES: AppFeature[] = [
  {
    id: "01",
    title: "Personalized Questions",
    description: "Get questions tailored to your role and experience.",
  },
  {
    id: "02",
    title: "Real-Time Feedback",
    description: "AI provides insights and tips as you answer.",
  },
  {
    id: "03",
    title: "Progress Tracking",
    description: "Visualize how much you've improved over time.",
  },
  {
    id: "04",
    title: "Mock Interviews",
    description: "Practice in a real interview environment with AI.",
  },
  {
    id: "05",
    title: "Concept Explanations",
    description: "Dive deep into technical concepts on demand.",
  },
  {
    id: "06",
    title: "Pin & Notes",
    description: "Bookmark important questions and add notes for later review.",
  },
];
