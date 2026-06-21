export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Create a session",
    description:
      "Set your target role, experience level, and topics you want to focus on.",
  },
  {
    step: "02",
    title: "Practice with AI",
    description:
      "Answer tailored questions and get instant feedback on your responses.",
  },
  {
    step: "03",
    title: "Track progress",
    description:
      "Review explanations, pin important questions, and improve over time.",
  },
] as const;

export const TECH_STACK = [
  {
    name: "Gemini AI",
    description: "Generates role-specific questions and in-depth explanations.",
  },
  {
    name: "Next.js",
    description: "Fast, modern app experience with server and client rendering.",
  },
  {
    name: "MongoDB",
    description: "Secure storage for sessions, questions, and your progress.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Interview AI helped me structure my prep. The AI feedback felt like a real mock interviewer.",
    author: "Priya S.",
    role: "Frontend Engineer",
  },
  {
    quote:
      "I used it daily before my onsite rounds. The concept explanations alone saved me hours.",
    author: "Marcus L.",
    role: "Full Stack Developer",
  },
  {
    quote:
      "Clean workflow, focused sessions, and questions that actually matched my job description.",
    author: "Elena R.",
    role: "Software Engineer",
  },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  account: [
    { label: "Sign in", href: "/signin" },
    { label: "Sign up", href: "/signup" },
    { label: "Create session", href: "/dashboard" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;
