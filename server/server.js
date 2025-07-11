const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");

const app = express();
const _dirname = path.resolve();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

function startCronJob() {
  // Run every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    console.log("⏰ Calling /cron at", new Date().toLocaleTimeString());

    try {
      const res = await axios.get("http://localhost:3000/cron");
      console.log("✅ API Response:", res.data);
    } catch (error) {
      console.error("❌ Failed to call /cron:", error.message);
    }
  });
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);
//coron job api
app.get("/cron", (req, res) => {
  console.log("🚀 /cron endpoint triggered at", new Date().toLocaleTimeString());
  startCronJob();
  res.send("✅ Cron task handled");
});

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
