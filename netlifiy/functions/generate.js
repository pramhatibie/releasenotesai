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

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };

  const ip = ((event.headers || {})["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const day = new Date().toISOString().slice(0, 10);
  const rk = ip + "::" + day;
  store[rk] = (store[rk] || 0) + 1;
  if (store[rk] > DAILY_LIMIT) return { statusCode: 429, headers, body: JSON.stringify({ error: "Daily limit reached. Come back tomorrow!" }) };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request" }) }; }

  const ALLOWED = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
  if (!ALLOWED.includes(body.model)) return { statusCode: 400, headers, body: JSON.stringify({ error: "Model not allowed" }) };

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: "GROQ_API_KEY not set in Netlify env vars" }) };

  try {
    const result = await groqRequest(apiKey, {
      model: body.model,
      messages: body.messages,
      max_tokens: 1500,
      temperature: 0.35,
    });
    if (result.status !== 200) return { statusCode: result.status, headers, body: JSON.stringify({ error: result.body?.error?.message || "Groq error" }) };
    return { statusCode: 200, headers, body: JSON.stringify(result.body) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};