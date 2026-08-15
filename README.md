# 🎭 Meme Community — Next-Gen Memetic Literacy & Classroom Bridge

<div align="center">

![Meme Community Banner](https://lh3.googleusercontent.com/aida-public/AB6AXuCUgayW8eGcEd3NHbwVDlpECrSayVBvT-Pdpt9TvK7G1co-SDiYXyUXDVRbpknx0WlLx0HpTvkgpFeh_jqpvvUQwhyMSFFMMUB6SRL0rfWvTGK3jCiR_40n-_R1BELylLXllQA_1oWkN3defrhCUKnenMtp-aFufHV0BFoMKgWy6tXGjNM8ZYCBujml-NWY_HaPze2IOTblCf78qOp7awb58St1NLDNI-jxHZSvQYWNMJNsPVjIjXakKQ)

### *Bridging the Generational Gap Between Educators and Students Through Meme Culture, Sociolinguistic AI, and Safe Digital Empathy.*

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 Executive Summary

**Meme Community** is an AI-powered educational web application engineered to solve the widening communication gap between educators and students. By transforming internet memes from classroom distractions into **academic and empathetic learning artifacts**, the platform equips teachers with real-time slang translation while providing students with a safe, gamified space to understand online social context and prevent cyberbullying.

---

## 🎯 The 3 Core Pillars

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              MEME COMMUNITY                                  │
├──────────────────────────────┬───────────────────────────────┬───────────────┤
│    1. Anti-Boredom Learning  │    2. Memetic Value & Depth   │ 3. Empathy    │
│  Interactive video streaming │   Linguistic origin dossiers, │  Safe sandbox │
│  and classroom polls that    │   academic rhetoric analysis, │  preventing   │
│  make media literacy fun.    │   and AI lesson generation.   │ cyberbullying.│
└──────────────────────────────┴───────────────────────────────┴───────────────┘
```

1. **⚡ Modern Non-Boring Learning**: Replaces dry lectures on digital citizenship with interactive video modules, community polls, and real-time cultural dialogue.
2. **🧠 Unlocking the Value of Memes**: Analyzes memes through sociolinguistics, satire, and rhetorical devices so teachers can integrate digital culture into language and social studies curricula.
3. **🛡️ Proactive Cyberbullying Prevention**: Helps users distinguish healthy humor from toxic exclusion and harassment in a safe, moderated environment.

---

## 🚀 Key Modules & Feature Architecture

### 1. 🎓 Top-Priority Learn Hub (`/learn`)
* **Real Multimedia Video Player**: Native streaming for **YouTube embeds** and direct **HTML5 MP4/WebM videos** with scrubbing, volume, and fullscreen controls.
* **Structured Curriculum**: Progressive learning modules covering internet irony, meme history, and classroom application tips.
* **OpenAI Lesson Studio**: Generates customized classroom lesson plans, slide decks, and formative check-ins in seconds.

### 2. 💬 Interactive Community Feed (`/`)
* **Dynamic Feed Tabs**:
  * **`For You`**: Engagement-ranked community feed with pinned teacher lessons at the top.
  * **`Following`**: Filtered feed showing only authors you follow with real-time sync.
  * **`Latest`**: Strictly reverse-chronological order for the newest posts.
  * **`Saved`**: Personal bookmarked posts saved to your account.
* **🧠 Teacher's Slang Breakdown**: Instant one-click AI drawer attached to every post explaining definitions, tone nuance, and classroom teaching points.
* **Classroom Polls**: Live interactive polling component with instant percentage visualizers (Educator/Admin exclusive).
* **Direct MP4 & YouTube Posting**: Upload `.mp4` video clips or attach YouTube links directly into feed posts.

### 3. 📡 Meme Radar & Trend Tracker (`/tracker`)
* **Trend Lifecycles**: Tracks emerging, peaking, and niche memes with origin dates and spread channels.
* **OpenAI Slang Explainer**: Submit any modern internet slang term to generate an instant cultural breakdown dossier.

### 4. 🛡️ System Control & Admin Panel (`/admin`)
* **Live KPI Dashboard**: Real-time stats on published curriculum modules, pending moderation reports, total registered users, and forum posts.
* **Video Curriculum Manager**: Add, edit (`EditVideoModal`), toggle publish/draft status, or delete video modules.
* **Moderation Review Queue**: Review teacher/student removal requests with 1-click **Delete Post & Resolve**.
* **Role Privilege Control**: Promote/demote members between `Student`, `Educator`, and `Admin`, or toggle account active/suspended status.

### 5. 💾 Permanent Persistent Data Engine
* File-backed JSON database under `data/` (`posts.json`, `videos.json`, `users.json`, `reports.json`, `trends.json`, `bookmarks.json`) ensuring all creations, edits, and deletions persist across page refreshes and server reloads.

---

## 🔐 Role-Based Permissions Matrix

| Capability | 🎒 Student | 🎓 Educator | 🛡️ Super Admin |
| :--- | :---: | :---: | :---: |
| **Browse Feed & Watch Lessons** | ✅ | ✅ | ✅ |
| **Create Community Posts** | ✅ | ✅ | ✅ |
| **Edit / Delete Own Posts** | ✅ | ✅ | ✅ |
| **Create Classroom Polls** | ❌ | ✅ | ✅ |
| **Request Post Removal** | ✅ | ✅ | ✅ |
| **Pin Posts to Top** | ❌ | ❌ | ✅ |
| **Delete ANY Member's Post** | ❌ | ❌ | ✅ |
| **Access Admin Panel (`/admin`)** | ❌ | ❌ | ✅ |
| **Manage Video Curriculum & User Roles** | ❌ | ❌ | ✅ |

---

## 📊 Data & Research Suitability

This project is tailored for **Data-Driven & Sociolinguistic Research Tracks**:

* **Quantitative Sentiment Tracking**: Analyzes the balance between constructive humor vs. toxic online language.
* **Open Research Dataset**: All trends, etymology origins, categories, and poll responses are structured in clean JSON format under `data/` for academic export (SPSS, Python pandas, R).
* **Perception Gap Metrics**: Captures empirical survey data on generational slang comprehension between educators and students.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | **Next.js 14** (App Router, Server Components & Client Components) |
| **Language** | **TypeScript 5** (Strict type safety across all models) |
| **Styling & Design System** | **Tailwind CSS 3.4** + Custom CSS (Material 3 Theme & Glassmorphism) |
| **Icons** | **Lucide React** |
| **Backend & APIs** | **Next.js Route Handlers** (`/api/posts`, `/api/videos`, `/api/admin/users`, `/api/memes`, `/api/ai/*`) |
| **Persistent Data Engine** | File-backed JSON Storage & Supabase |
| **AI Integration** | **OpenAI API** (GPT-4o NLP Parsing & Slang Decoding) |

---

## 🏁 Getting Started & Local Setup

### 1. Prerequisites
* **Node.js**: `v18.17.0` or higher
* **npm** or **yarn**

### 2. Clone and Install
```bash
# Clone the repository
git clone https://github.com/<YOUR-USERNAME>/meme-community.git
cd meme-community

# Install dependencies
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://gegewgrpmqhnhutasjby.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** (or the active port in your terminal) in your browser.

---

## 🔑 Default Demo Accounts

| Role | Email | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **🛡️ Super Admin** | `admin@admin.admin` | `admin123` | Full administrative control, post deletion, pinning, curriculum editing. |
| **🎓 Educator** | `teacher@memecommunity.edu` | *Any password* | Teacher role with classroom poll creation and slang breakdown tools. |
| **🎒 Student** | `student@memecommunity.edu` | *Any password* | Student role for exploring memes, posting, commenting, and voting. |

---

## 📁 Project Directory Map

```
67/
├── data/                      # 💾 Persistent JSON Storage
│   ├── bookmarks.json         # User bookmark records
│   ├── posts.json             # Live community posts & polls
│   ├── reports.json           # Moderation queue reports
│   ├── trends.json            # Meme tracker trend dossiers
│   ├── users.json             # Registered user profiles
│   └── videos.json            # Educational video catalog
├── src/
│   ├── app/                   # 📄 Next.js App Router (Pages & APIs)
│   │   ├── admin/             # Admin Dashboard page
│   │   ├── api/               # Serverless API routes (posts, videos, users, memes, ai)
│   │   ├── auth/              # Sign In & Registration page
│   │   ├── learn/             # Learn Hub & Video curriculum
│   │   ├── tracker/           # Meme Radar & Slang Explainer
│   │   ├── globals.css        # Global CSS design tokens
│   │   ├── layout.tsx         # Main layout wrapper
│   │   └── page.tsx           # Community Feed
│   ├── components/            # 🧩 UI Components
│   │   ├── admin/             # AddVideoModal, EditVideoModal
│   │   ├── feed/              # PostCard, FeedComposer, EditPostModal, ProfileModal, TrendingSidebar
│   │   ├── layout/            # Sidebar, BottomNav, Header, AppLayout
│   │   ├── learn/             # VideoPlayerModal (YouTube/MP4), AILessonGeneratorModal
│   │   └── tracker/           # MemeDetailModal, SuggestMemeModal
│   ├── context/               # 🔐 AuthContext (state, permissions, bookmarks, follows)
│   └── lib/                   # 🛠️ Data models & utilities
│       ├── data/              # mock-data.ts, storage.ts
│       └── supabase/          # client.ts, server.ts, schema.sql
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and build upon it for academic and educational purposes.
