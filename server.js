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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});