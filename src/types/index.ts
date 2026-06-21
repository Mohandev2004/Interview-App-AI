export interface User {
  _id?: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  token?: string;
}

export interface Question {
  _id: string;
  question: string;
  answer: string;
  isPinned?: boolean;
}

export interface Session {
  _id: string;
  role: string;
  topicsToFocus: string;
  topicToFocus?: string;
  experience: number | string;
  description?: string;
  questions: Question[];
  updatedAt?: string;
}

export interface AuthResponse extends User {
  token: string;
}

export interface ExplanationResponse {
  title?: string;
  explanation?: string;
}

export interface CardBgItem {
  id: number;
  bgcolor: string;
}

export interface AppFeature {
  id: string;
  title: string;
  description: string;
}

export interface UserContextValue {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}
