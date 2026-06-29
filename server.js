// Import packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load API key from .env
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});
// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("FocusFlow AI Server is running!");
});

// Start server
const PORT = 3000;
// =========================================
// GENERATE AI PLAN
// =========================================

app.post("/generate-plan", async (req, res) => {

    try {

        const { prompt } = req.body;

        const result = await model.generateContent(prompt);

        const response = await result.response;

        const text = response.text();

        res.json({
            success: true,
            plan: text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
// =========================================
// AI COACH
// =========================================

app.post("/generate-coach", async (req, res) => {

    try {

        const prompt = `
You are an AI productivity coach.

Return ONLY valid JSON.

{
  "plan": [
    "",
    "",
    ""
  ],
  "avoidance": {
    "task": "",
    "count": "",
    "reason": ""
  },
  "reasoning": [
    "",
    "",
    ""
  ],
  "confidence": 85,
  "risk": "",
  "confidenceReason": ""
}

The student is studying:
- DBMS
- DSA
- Hackathon

Rules:

- Return EXACTLY 3 plan items.
- Each plan item must contain LESS THAN 6 WORDS.

- Return EXACTLY 3 reasoning points.
- Each reasoning point must contain LESS THAN 12 WORDS.

- Avoidance task must contain LESS THAN 5 WORDS.

- Avoidance count should ONLY be a number.
Example:
"count":"4"

- Avoidance reason must contain LESS THAN 10 WORDS.

- Confidence must be an integer between 70 and 100.

- Risk must ONLY be:
Low
Medium
High

- Confidence reason must contain LESS THAN 10 WORDS.

Return ONLY valid JSON.
`;

        const result = await model.generateContent(prompt);

        const response = await result.response;

        

        const text = response.text();

const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

res.json({

    success: true,

    coach: JSON.parse(cleanText)

});

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});