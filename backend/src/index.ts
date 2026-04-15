import express from "express";
import OpenAI from "openai";

const client = new OpenAI({
    baseURL: process.env.LLM_URL,
    apiKey: process.env.API_KEY,
});
const llmModel = process.env.LLM_MODEL || "smollm2:latest";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/api/v1/chat", async (req, res) => {
    if (!req.body.input || req.body.input.length === 0) {
        return res.status(400).send("Input is required");
    }

    const response = await client.chat.completions.create({
        model: llmModel,
        messages: [{ role: "user", content: req.body.input }],
    });

    return res.send(response.choices[0]?.message.content);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
