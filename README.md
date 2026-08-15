# 🎭 Meme Community — Next-Gen Memetic Literacy & Classroom Bridge

> **Bridging the generational gap between educators and students through meme culture, digital empathy, and interactive media literacy.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

## 🌟 App Vision & Problem Statement

In today's hyper-connected internet era, memes and digital vernacular evolve at lightning speed. 
* **For Educators**: Traditional classrooms often struggle with generational disconnect and student disengagement because youth slang feels opaque and unapproachable.
* **For Students**: Lack of cultural literacy can lead to feeling left out, while unmoderated meme culture can rapidly mutate into toxic **cyberbullying**.

**Meme Community** transforms memes from classroom distractions into a **rigorous, engaging educational bridge**, equipping teachers with real-time slang translation while providing students with a safe, empathetic space for digital discourse.

---

## 🚀 Key Features

### 1. 🎓 Elevated Learn Hub (`/learn`)
* **Real Video Streaming**: Native support for **YouTube embeds** and direct **HTML5 MP4 video** playback with interactive scrubbing and volume controls.
* **Curriculum Roadmap**: Modular lessons breaking down internet irony, memetic rhetoric, and digital etiquette.
* **AI Lesson Generator**: Powered by OpenAI to generate classroom lesson plans, slide decks, and formative quiz checks tailored to specific meme topics.

### 2. 💬 Interactive Community Feed (`/`)
* **Dynamic Feed Tabs**: Filter posts across **`For You`** (engagement-ranked), **`Following`** (real-time followed authors), **`Latest`** (reverse-chronological), and **`Saved`** (bookmarks).
* **🧠 Teacher's Slang Breakdown**: Instant one-click AI drawer attached to posts explaining slang etymology, tone nuance, and safe classroom applications.
* **Classroom Polls**: Interactive voting polls with live percentage feedback (Teacher & Admin feature).
* **Media & Video Upload**: Attach YouTube links, images, or upload `.mp4` video files directly.

### 3. 📡 Meme Radar & Trend Tracker (`/tracker`)
* **Cultural Radar**: Real-time trend dossiers tracking emerging, peaking, and niche memes.
* **OpenAI Slang Explainer**: Submit any internet phrase to receive a structured sociolinguistic breakdown.

### 4. 🛡️ System Control & Admin Panel (`/admin`)
* **KPI Metrics**: Real-time dashboards for published video modules, moderation review queues, total user roles, and forum posts.
* **Video Curriculum Manager**: Add, edit, toggle published/draft status, or delete educational video modules with instant persistence.
* **Moderation Review Queue**: Review teacher/student removal requests, delete reported posts, or dismiss false flags in one click.
* **User Permissions**: Promote/demote members between `Student`, `Educator`, and `Admin`, or toggle account active/suspended status.

### 5. 💾 Permanent Persistent Storage
* Persistent JSON storage engine (`data/posts.json`, `data/videos.json`, `data/users.json`, `data/reports.json`, `data/trends.json`) ensuring all created posts, edits, deletions, and bookmarks survive browser reloads and server restarts.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Vanilla CSS + Tailwind CSS (Material 3 Dark/Light Palette) |
| **Icons** | Lucide React |
| **Backend & APIs** | Next.js Serverless Route Handlers (`/api/posts`, `/api/videos`, `/api/admin/users`, `/api/memes`, `/api/ai/explain`) |
| **Storage** | File-backed JSON Storage & Supabase |
| **AI Engine** | OpenAI API |

---

## 🏁 Getting Started

### Prerequisites
* **Node.js**: `v18.17.0` or higher
* **npm** or **yarn**

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/meme-community.git
   cd meme-community
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://gegewgrpmqhnhutasjby.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) (or the active port displayed in your terminal).

---

## 🔐 Default Demo Accounts

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **🛡️ Super Admin** | `admin@admin.admin` | `admin123` | Full access: delete any post, pin posts, manage user roles, edit curriculum, resolve reports. |
| **🎓 Educator** | `teacher@memecommunity.edu` | *Any password* | Create classroom polls, request post removal, decode slang, access lesson generator. |
| **🎒 Student** | `student@memecommunity.edu` | *Any password* | Create posts, comment, like, bookmark, and explore meme curriculum. |

---

## 📁 Project Structure

```
67/
├── data/                      # Persistent JSON storage
│   ├── bookmarks.json
│   ├── posts.json
│   ├── reports.json
│   ├── trends.json
│   ├── users.json
│   └── videos.json
├── src/
│   ├── app/                   # Next.js App Router Pages & APIs
│   │   ├── admin/             # Admin Dashboard page
│   │   ├── api/               # Serverless API routes (posts, videos, admin, ai, memes)
│   │   ├── auth/              # Authentication page
│   │   ├── learn/             # Learning Center & Video curriculum
│   │   ├── tracker/           # Meme Radar page
│   │   ├── globals.css        # Material 3 design tokens & theme
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Community Feed page
│   ├── components/
│   │   ├── admin/             # AddVideoModal, EditVideoModal
│   │   ├── feed/              # PostCard, FeedComposer, EditPostModal, ProfileModal, TrendingSidebar
│   │   ├── layout/            # Sidebar, BottomNav, Header, AppLayout
│   │   ├── learn/             # VideoPlayerModal (YouTube/MP4), AILessonGeneratorModal
│   │   └── tracker/           # MemeDetailModal, SuggestMemeModal
│   ├── context/               # AuthContext (session, role permissions, bookmarks, follows)
│   └── lib/
│       ├── data/              # mock-data.ts, storage.ts
│       └── supabase/          # client.ts, server.ts, schema.sql
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 📜 License & Acknowledgments

* **License**: MIT
* **Designed & Engineered for**: Next-Generation Digital Literacy, Sociolinguistic Research, and Classroom Innovation.
