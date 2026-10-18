# Nexora — Full-Stack Opportunity & Venture Platform

> **Hackathon Theme:** *“Entrepreneurship & Employment: Connecting Talent, Ideas, and Opportunities.”*  
> **Platform Promise:** One unified ecosystem to discover opportunities, develop skills, build teams, and turn ideas into careers or thriving ventures.

---

## 🌟 1. Project Vision & Problem Statement

Modern students and professionals often face fragmented platforms: one app for applying to enterprise jobs, another for freelance gigs, disparate forums for startup co-founders, and scattered networks for finding mentors. 

**Nexora solves these fundamental bottlenecks:**
- **Students & Job Seekers:** Struggle to discover transparent internships, entry-level roles, and legitimate hackathons with honest skill matching.
- **Founders & Entrepreneurs:** Struggle to recruit complementary co-founders, validate early problem statements, and secure practical mentorship.
- **Recruiters & Employers:** Face noise from unqualified applications and lack transparent skill-fit filtering.
- **Mentors:** Lack structured scheduling to give back to aspiring builders.

**Nexora** connects all four key actors in a modern, responsive, full-stack application equipped with **dual-path career tracking**, **transparent algorithmic matching**, and **structured venture validation checklists**.

---

## 👥 2. Target Roles Supported

| Role | Core Capabilities |
| :--- | :--- |
| **Job Seeker / Student** | Profile & skill builder, opportunity marketplace, 1-click in-platform application, bookmarking, smart fit explanations, career progress tracker. |
| **Entrepreneur / Founder** | Venture launchpad, problem/solution disclosure, 5-point validation checklist, collaborator & co-founder recruitment, expression-of-interest review. |
| **Recruiter / Employer** | Organization verification, structured opportunity posting (paid/equity/stipend), candidate talent directory search, application review. |
| **Mentor** | Advisory topics, expertise domain badges, availability management, 1:1 session scheduling. |

---

## 🚀 3. Standout Hackathon Features

### 🎯 Feature 1: Transparent Opportunity Fit Score (Explainable Matching)
Nexora does not make dubious claims about black-box AI. It features an open, explainable matching algorithm:
- **Skills Match (40%):** Direct & partial overlap between user skills and required qualifications.
- **User Interests (25%):** Keyword alignment across venture types and areas of curiosity.
- **Career Goals (20%):** Textual & role alignment with the user's articulated milestones.
- **Work Preference & Location (10%):** Remote, hybrid, or on-site alignment.
- **Experience Level (5%):** Seniority calibration (entry, mid, senior, lead).
- **Expandable Reasons:** Every opportunity card dynamically explains *why* it fits you (e.g., *"Your React & TypeScript skills match the requirements; remote role matches your preference"*).

### 🛠️ Feature 2: Idea-to-Team Builder & Validation Checklist
Founders can articulate:
- Problem Statement & Target Audience
- Differentiated Solution & Business Model
- **5-Point Progress Checklist:** Problem Documented → Personas Defined → Solution Articulated → Market Researched → Prototype Built.
- Expressed collaborator requests with skill tags.

### 🔄 Feature 3: Dual Career Path
Users are not locked into either being an employee or a founder. Nexora's architecture allows members to concurrently explore jobs and launch startups.

### 🛡️ Feature 4: Trust & Verification Indicators
- **Entity Verification:** Honest badges (`Verified Entity`, `Pending`, `Unverified Listing`).
- **Quality Checklist:** Automated completeness indicators checking scope, compensation, requirements, and contact routes.
- **Listing Flagging:** In-platform reporting system for spam or fraudulent postings.

---

## 💻 4. Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS, custom SaaS Navy (`#0f172a`) & Vibrant Teal (`#14b8a6`) palette, responsive mobile navigation
- **Icons:** Lucide React
- **Data Architecture:** 
  - Dual Mode: **Supabase PostgreSQL** backend with full RLS policies (`supabase/schema.sql` and `supabase/seed.sql`)
  - **Zero-Config Persistent Local Demo Mode:** Automatic fallback with realistic sample data, localStorage mutations, and 5 one-click demo persona logins.

---

## ⚡ 5. Quickstart & Local Setup

### Prerequisites
- Node.js (v18+ or v24 LTS recommended)
- npm

### 1. Clone & Enter Project Directory
```powershell
cd c:\Users\Admin\OneDrive\Desktop\HACKHIFT\nexora
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Launch Development Server
```powershell
npm run dev
```
Open your browser at: **`http://localhost:5173`**

### 4. Build for Production
```powershell
npm run build
npm run preview
```

---

## 🗄️ 6. Supabase Database Configuration (Optional)

If you have a Supabase project and wish to use the cloud database:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Populate:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Open the **SQL Editor** in your Supabase dashboard and run:
   - `supabase/schema.sql` (creates all 13 tables, GIN indexes, RLS policies, and triggers)
   - `supabase/seed.sql` (seeds demo users, opportunities, startups, and mentors)

> **Note on Demo Mode:** When `.env` is omitted or empty, Nexora automatically runs in **Offline Demo Mode**. All data is persisted in browser storage, allowing judges to test every flow without external API keys.

---

## 🎬 7. Hackathon Judge Demo Script (3-Minute Tour)

1. **Landing Page (`/`):**
   - Check the modern SaaS Hero, live platform stats (clearly labeled demo data), and Dual Career Path cards.
   - Click **"Explore Opportunities"**.

2. **Opportunity Marketplace (`/opportunities`):**
   - Search for *"React"* or filter by *"Remote"* and *"Internship"*.
   - Notice the **Match Score Badges** with expandable algorithmic reasoning.
   - Click into an opportunity (`/opportunities/demo-opp-1`) to view the **Quality Checklist** and submit an in-platform application.

3. **Instant Role-Switching (`/auth/login`):**
   - Go to Sign In. Use the **"Try Demo Accounts"** one-click buttons:
     - Log in as **Aisha (Student/Developer)** to view personalized recommendations and submitted applications in `/dashboard`.
     - Log in as **Priya (Founder)** to view startup collaborator management in `/dashboard`.
     - Log in as **Dr. Sarah (Mentor)** to view advising topics.

4. **Startup Launchpad (`/startups`):**
   - Inspect **EduBridge** or **HealthPulse**.
   - Check the **5-Point Validation Checklist**.
   - Click **"Request to Collaborate"** and submit complementary skill tags.

5. **Mentorship & Community (`/mentors` & `/community`):**
   - Filter mentors by discipline and request a 1:1 strategy session.
   - Post a project showcase in the Community hub, toggle likes, and post comments.

---

## 🧪 8. Acceptance Verification Checklist

- [x] Student can view personalized match scores and filter listings.
- [x] In-platform application form with duplicate application guard.
- [x] Application status tracker reflects submitted entries.
- [x] Startup Launchpad with 5-point validation checklist and collaboration requests.
- [x] Mentor Connect with topic selectors and session request modal.
- [x] Candidate Talent Directory protecting private info and showing public profiles.
- [x] Community board with categorised posts, like counter, and nested comments.
- [x] 1-click demo role switching across student, designer, founder, recruiter, and mentor.
- [x] Responsive layout with collapsible mobile navigation.
- [x] Production build passes clean TypeScript and Vite compilation.
