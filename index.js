import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) return res.json({ error: "Sem prompt" });

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "Responda curto, educado, sem ### e seguindo o TOS do Roblox."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 80
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "Sem resposta" });

  } catch {
    res.json({ error: "Erro interno" });
  }
});

app.listen(3000);
