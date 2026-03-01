<div align="center">

# ⚡ ReleaseNotes.ai

### Turn messy git commits into beautiful release notes in under 1 second.

**Free · No signup · No API key needed · Powered by Groq AI**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-releasenotesai.vercel.app-f1c40f?style=for-the-badge&labelColor=080c14)](https://releasenotesai.vercel.app)
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
| 🔀 **Any commit format** | Works with Conventional Commits, plain English, emojis, ticket numbers — anything |
| 📋 **4 output formats** | GitHub Release · npm CHANGELOG · Customer Update · Slack/Teams |
| ⚡ **Sub-second speed** | Groq's LPU inference delivers results faster than typing |
| 🆓 **Completely free** | No account, no API key, no credit card. Ever. |
| 🌍 **Zero setup** | Browser-based. Works on any device. |
| 🔗 **Shareable outputs** | Copy-with-credit button creates backlinks automatically |

---

## 🚀 Try It Now

👉 **[releasenotesai.vercel.app](https://releasenotesai.vercel.app)**

No installation. Open browser, paste commits, get release notes.

---

## 🛠️ Self-Host in 5 Minutes

### Prerequisites
- [Vercel account](https://vercel.com) (free)
- [Groq API key](https://console.groq.com/keys) (free, no credit card)

### Deploy

```bash
# 1. Clone this repo
git clone https://github.com/pramhatibie/releasenotesai.git
cd releasenotesai

# 2. Deploy to Vercel
npx vercel

# 3. Add your Groq API key
# Vercel Dashboard → Project → Settings → Environment Variables
# Key: GROQ_API_KEY
# Value: gsk_xxxxxxxxxxxx

# 4. Redeploy to activate the key
npx vercel --prod
```

That's it. Your own instance is live. ✅

### Project Structure

```
releasenotesai/
├── index.html          # Full frontend (React via CDN, no build step)
├── vercel.json         # Vercel routing config
└── api/
    └── generate.js     # Serverless function — Groq proxy with rate limiting
```

---

## 🤖 How It Works

```
User pastes commits
       │
       ▼
 Browser sends POST to /api/generate
       │
       ▼
 Vercel Serverless Function
  ├── Rate limit check (15 req/day per IP)
  ├── Model validation
  └── Forwards to Groq API (llama-3.1-8b-instant)
       │
       ▼
 Groq LPU inference (~600ms)
       │
       ▼
 Structured Markdown returned to browser
       │
       ▼
 User copies & ships 🚀
```

---

## 📊 Output Formats Explained

### GitHub Release
Standard Markdown grouped by type (Features, Fixes, Security, etc.) with emoji headers. Ready to paste directly into GitHub's "Create Release" page.

### npm CHANGELOG
Follows the [Keep a Changelog](https://keepachangelog.com) convention exactly. Paste into your `CHANGELOG.md`.

### Customer-Facing Update
Plain-language announcement written for non-technical users. Blog post, in-app notification, or email newsletter ready.

### Slack / Teams
Short, scannable bullet list for internal team communication. Fits in a single message without scrolling.

---

## ⚙️ Configuration

| Environment Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | Your Groq API key from [console.groq.com](https://console.groq.com/keys) |

### Rate Limiting
By default: **15 free generations per IP per day**. Change in `api/generate.js`:
```js
const DAILY_LIMIT = 15; // adjust as needed
```

---

## 🧠 Models

| Model | Speed | Quality | Status |
|---|---|---|---|
| `llama-3.1-8b-instant` | ⚡ ~600ms | Very good | ✅ Default (free) |
| `llama-3.3-70b-versatile` | ~1.5s | Excellent | 🔒 Premium (coming soon) |

---

## 🗺️ Roadmap

- [ ] GitHub OAuth — auto-fetch commits from any repo
- [ ] One-click post to GitHub Releases
- [ ] CLI tool (`npx releasenotesai`)
- [ ] VS Code extension
- [ ] CI/CD webhook (auto-generate on git tag push)
- [ ] Multi-language support (Japanese, Spanish, Portuguese)
- [ ] Llama 3.3 70B for Pro users

---

## 🤝 Contributing

PRs welcome! This project is intentionally simple — no build step, no bundler, just HTML + a serverless function.

```bash
# Fork the repo, then:
git clone https://github.com/pramhatibie/releasenotesai.git

# Open index.html in browser directly — it works without a server
# (you'll need a backend for API calls, but UI is fully previewable)

# Make changes, then submit a PR
```

---

## 📄 License

MIT — free to use, modify, and deploy. Attribution appreciated but not required.

---

<div align="center">

**Built with ❤️ and [Groq](https://groq.com) · Deployed on [Vercel](https://vercel.com)**

If this saved you time, consider starring ⭐ the repo — it helps others find it.

[![Star this repo](https://img.shields.io/github/stars/pramhatibie/releasenotesai?style=social)](https://github.com/pramhatibie/releasenotesai)

</div>
