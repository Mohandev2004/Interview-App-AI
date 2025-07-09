export const BASE_URL = "https://interview-app-ai-delta.vercel.app";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },

    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions",
        GENERATE_EXPLANATION: "/api/ai/generate-explanation",
    },

    SESSION: {
        CREATE: "/api/session/create",
        GET_ALL: "/api/session/my-session",
        GET_ONE:(id) => `/api/session/${id}`,
        DELETE:(id) => `/api/session/${id}`,
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add",
        PIN: (id) => `/api/questions/${id}/pin`,
        UPLOAD_NOTE: (id) => `/api/questions/${id}/note`,
    }
};