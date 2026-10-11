# Pulse Scripts Studio

Build a sleek, modern AI Dashboard application called "Braco OmniPulse" — an AI-powered regional influencer marketing platform targeting South Asian vernacular markets.

### 🎨 Visual & UI System Design
- **Theme:** Modern Dark Tech Aesthetic with Deep Slate (#0B0F17), Indigo, and Emerald accents (Linear/Vercel dashboard style).
- **Components:** Glassmorphism cards with subtle borders (`border-white/10`), vibrant micro-interactions, glowing accents, and toast notifications.
- **Sidebar Navigation:**
  1. 📊 Dashboard Overview
  2. 🌐 Multilingual Script Engine
  3. ⚖️ ASCI Compliance Screener
  4. 🎯 Regional Creator Discovery
  5. ⚙️ Settings (Gemini API Configuration)

---

### 🛠️ Core Features & Capabilities

#### 1. Settings & API Integration
- A secure Settings page with an input field for `GEMINI_API_KEY`.
- Store the key securely in local state or browser storage for frontend API calls.
- Toggle switch for **"Live Gemini Engine"** vs. **"Offline Mock Engine"**.

#### 2. Vernacular Hook & Script Generator
- **Inputs:** Campaign Title, Target Niche (Tech, Beauty, Finance, Lifestyle, Food), Core Brief/Offer.
- **Regional Dialect Dropdown:** Telugu, Tamil, Hindi, Kannada, and English.
- **Hook Style Dropdown:** High-Energy Reel Hook, Storytelling, Unboxing Review, Humorous Skit.
- **Action Button:** **"Generate Script"**
- **Generation Logic:** 
  - Uses `gemini-2.5-flash` model via Gemini API to generate structured localized content: **Visual/Camera Cue**, **Regional Hook**, **Body Caption**, and **Hashtags**.
  - Includes a built-in fallback to localized mock templates if no API key is provided.
- **Action Bar:** "Copy Script", "Send to ASCI Compliance Check".

#### 3. ASCI Compliance Screener
- **Input:** Raw caption/script text or auto-filled from the Script Generator.
- **Action Button:** **"Run ASCI Audit"**
- **Checks:**
  - Mandatory disclosure tags (`#ad`, `#sponsored`, `Paid Partnership`).
  - Unverified absolute claims (e.g., "100% cure", "guaranteed earnings", "miracle fix").
  - Cultural sensitivity guardrails.
- **UI Output:** Visual **Compliance Score Dial (0–100%)**, Status Badge (Approved / Action Required / Flagged), list of flagged terms, and an **"Auto-Fix with Gemini"** button that rewrites non-compliant lines.

#### 4. Regional Creator Discovery
- Card grid displaying regional creators with metrics:
  - Creator Name, Handle, Primary Regional Dialect (e.g., Telugu, Tamil, Hindi), Secondary Languages.
  - Follower Count, Avg. Engagement Rate %, and **ASCI Trust Score (e.g., 98%)**.
- Filters by Language, Niche, and Compliance Score threshold.

#### 5. Campaign Analytics Command Center
- Quick Stat Cards: Total Regional Reach, Active Campaigns, ASCI Compliance Pass Rate %, and Language Reach Breakdown (Telugu: 40%, Tamil: 35%, Hindi: 25%).

---

### 📱 UX & Technical Requirements
- Fully responsive across Desktop, Tablet, and Mobile devices.
- Interactive loading spinners and toast alerts on script generation, compliance checks, and API key saves.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pulse-scripts-studio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0fe492fb-3a7c-49c8-b62e-fd7789796966).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
