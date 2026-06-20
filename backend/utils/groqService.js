const Groq = require("groq-sdk");
require("dotenv").config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getAIResponse = async (prompt, system = "") => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: system || "You are a helpful project management assistant." },
      { role: "user", content: prompt }
    ],
    max_tokens: 1024,
  });
  return response.choices[0].message.content;
};

const generateSubtasks = async (taskTitle, taskDescription = "") => {
  const prompt = `
Generate 5 subtasks for this task:
Title: ${taskTitle}
Description: ${taskDescription || "No description"}

Return ONLY a JSON array like this (no markdown):
["subtask 1", "subtask 2", "subtask 3", "subtask 4", "subtask 5"]
`;
  const response = await getAIResponse(prompt);
  try {
    const clean = response.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return ["Research", "Plan", "Implement", "Test", "Review"];
  }
};

const generateTaskDescription = async (taskTitle) => {
  const prompt = `Write a clear, concise task description (2-3 sentences) for: "${taskTitle}"`;
  return await getAIResponse(prompt);
};

const estimateTime = async (taskTitle, subtasks = []) => {
  const prompt = `
Estimate time in hours for this task:
Title: ${taskTitle}
Subtasks: ${subtasks.join(", ")}

Return ONLY a JSON object (no markdown):
{"hours": 4, "breakdown": "2h implementation, 1h testing, 1h review"}
`;
  const response = await getAIResponse(prompt);
  try {
    const clean = response.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return { hours: 4, breakdown: "Estimated 4 hours total" };
  }
};

module.exports = { getAIResponse, generateSubtasks, generateTaskDescription, estimateTime };