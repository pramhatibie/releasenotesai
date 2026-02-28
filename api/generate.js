const https = require("https");
const DAILY_LIMIT = 15;
const store = {};

function groqRequest(apiKey, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req = https.request({
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
        "Content-Length": Buffer.byteLength(body),
      },
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { reject(new Error("Parse error: " + data.slice(0, 200))); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Hanya izinkan POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Rate limiting by IP
  const ip = (req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const day = new Date().toISOString().slice(0, 10);
  const rk = ip + "::" + day;
  store[rk] = (store[rk] || 0) + 1;
  if (store[rk] > DAILY_LIMIT) {
    res.status(429).json({ error: "Daily limit reached. Come back tomorrow!" });
    return;
  }

  // Parse body
  let body;
  try { body = req.body; }  // Vercel sudah otomatis parse JSON
  catch {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  // Validasi model
  const ALLOWED = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
  if (!ALLOWED.includes(body.model)) {
    res.status(400).json({ error: "Model not allowed" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GROQ_API_KEY not set in Vercel env vars" });
    return;
  }

  try {
    const result = await groqRequest(apiKey, {
      model: body.model,
      messages: body.messages,
      max_tokens: 1500,
      temperature: 0.35,
    });
    if (result.status !== 200) {
      res.status(result.status).json({ error: result.body?.error?.message || "Groq error" });
      return;
    }
    res.status(200).json(result.body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
