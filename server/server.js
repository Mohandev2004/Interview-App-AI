const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware");
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");

const app = express();
const _dirname = path.resolve();

const allowedOrigins = [ 
  "https://interview-app-ai-one.vercel.app",
  "https://interview-app-fi11h1jwq-mohan-as-projects-9860f931.vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);



app.use("/uploads", express.static(path.join(_dirname, "uploads")));

app.use(express.static(path.join(_dirname, "/client/interview/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client/interview", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log("Registered route:", middleware.route.path);
  }
});