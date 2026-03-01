<div align="center">

# ⚡ ReleasAI

### Turn messy git commits into beautiful release notes in under 1 second.

**Free · No signup · No API key needed · Powered by Groq AI**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-releasai.vercel.app-f1c40f?style=for-the-badge&labelColor=080c14)](https://releasai.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&labelColor=080c14)](LICENSE)
[![Made with Groq](https://img.shields.io/badge/AI-Groq_Llama_3-orange?style=for-the-badge&labelColor=080c14)](https://groq.com)

</div>

---

## 🎬 Demo

> Paste this → get that. In less than 1 second.

**Input — your raw git log:**
```
feat: add dark mode toggle to settings panel
fix: resolve infinite loop when user has no projects
perf: reduce initial bundle size by 40% via code splitting
security: patch XSS vulnerability in comment renderer
feat: add CSV export for analytics dashboard
fix: email notifications not sending for EU users
```

**Output — polished GitHub Release Notes:**
```markdown
This release delivers dark mode, smarter analytics exports, and critical security patches.

## 🎉 New Features
- Added dark mode toggle to the user settings panel
- Introduced one-click CSV export for the analytics dashboard

## 🐛 Bug Fixes
- Fixed infinite loop triggered when a user account has no projects
- Resolved email notification delivery failure for users in EU region

## ⚡ Performance
- Reduced initial JavaScript bundle size by 40% via code splitting

## 🔒 Security
- Patched stored XSS vulnerability in the comment markdown renderer

**Full Changelog:** `v1.1.0...v1.2.0`
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI-powered** | Groq LPU inference — results in under 1 second |
| 🔀 **Any commit format** | Conventional Commits, plain English, emojis, ticket numbers — anything |
| 📋 **4 output formats** | GitHub Release · npm CHANGELOG · Customer Update · Slack/Teams |
| 🆓 **Completely free** | No account, no API key, no credit card. Ever. |
| 🌍 **Zero setup** | Browser-based. Works on any device. |
| 🔗 **Viral backlinks** | Copy-with-credit embeds a backlink in every GitHub Release |

---

## 🚀 Try It Now

👉 **[releasai.vercel.app](https://releasai.vercel.app)**

No installation. Open browser, paste commits, get release notes.

---

## 🛠️ Self-Host in 5 Minutes

### Prerequisites
- [Vercel account](https://vercel.com) (free)
- [Groq API key](https://console.groq.com/keys) (free, no credit card)

### Deploy

```bash
# 1. Clone this repo
git clone https://github.com/pramhatibie/releasai.git
cd releasai

# 2. Push to your own GitHub and connect to Vercel
# vercel.com → Add New Project → Import from GitHub

# 3. Add your Groq API key
# Vercel Dashboard → Project → Settings → Environment Variables
# Key: GROQ_API_KEY  |  Value: gsk_xxxxxxxxxxxx

# 4. Redeploy to activate the key
# Vercel Dashboard → Deployments → Redeploy
```

✅ Done. Your own instance is live.

### Project Structure

```
releasai/
├── index.html          # Full frontend (React via CDN, zero build step)
├── vercel.json         # Vercel routing config
└── api/
    └── generate.js     # Serverless function — Groq proxy with rate limiting
```

---

## 🤖 How It Works

```
User pastes git commits
         │
         ▼
  Browser → POST /api/generate
         │
         ▼
  Vercel Serverless Function
   ├── Rate limit (20 req/day per IP)
   ├── Model validation
   └── Forwards to Groq API
         │
         ▼
  Groq LPU inference (~600ms)
         │
         ▼
  Polished Markdown → User copies & ships 🚀
```

---

## 📋 Output Formats

| Format | Use case |
|---|---|
| **GitHub Release** | Paste directly into GitHub → Releases → Create new release |
| **npm CHANGELOG** | Drop into your `CHANGELOG.md` — Keep a Changelog format |
| **Customer Update** | Blog post, in-app announcement, email newsletter |
| **Slack / Teams** | Internal team ping — scannable, emoji-friendly |

---

## ⚙️ Configuration

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ | From [console.groq.com/keys](https://console.groq.com/keys) — free |

**Rate limiting** — default 20 req/day per IP. Change in `api/generate.js`:
```js
const DAILY_LIMIT = 20;
```

---

## 🧠 Models

| Model | Speed | Quality | Status |
|---|---|---|---|
| `llama-3.1-8b-instant` | ⚡ ~600ms | Very good | ✅ Free |
| `llama-3.3-70b-versatile` | ~1.5s | Excellent | 🔒 Premium — coming soon |

---

## 🗺️ Roadmap

- [ ] GitHub OAuth — auto-fetch commits from any repo
- [ ] One-click publish to GitHub Releases
- [ ] CLI: `npx releasai`
- [ ] VS Code extension
- [ ] CI/CD webhook (auto-generate on git tag push)
- [ ] Llama 3.3 70B for Pro users

---

## 🤝 Contributing

No build step, no bundler — just HTML + one serverless function. PRs welcome.

```bash
git clone https://github.com/pramhatibie/releasai.git
# Edit index.html or api/generate.js
# Submit PR
```

---

## 📄 License

MIT — free to use, modify, and self-host.

---

<div align="center">

**Built with ❤️ and [Groq](https://groq.com) · Deployed on [Vercel](https://vercel.com)**

If Releasai saved you time, a ⭐ helps others find it.

[![Star this repo](https://img.shields.io/github/stars/pramhatibie/releasai?style=social)](https://github.com/pramhatibie/releasai)

</div>
