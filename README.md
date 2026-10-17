# Smart CV Builder — Build Your CV. Keep Your Privacy.

A modern, privacy-focused, ATS-friendly online CV builder built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**. Designed for students, fresh graduates, job seekers, and experienced professionals to create recruiter-ready resumes without creating an account or storing sensitive personal data on external servers.

---

## 🌟 Key Value Propositions

- **100% Privacy-First**: No signup, no login, and no backend database. All CV data is saved locally in your browser (`localStorage`).
- **Real-Time ATS Readiness Score**: Live 0–100 compatibility meter evaluating contact completeness, measurable metrics (STAR method), power action verbs, and section quality.
- **5 ATS-Compliant Templates**:
  - **Classic ATS**: Ivy League / Harvard single-column format with crisp horizontal rules.
  - **Modern Professional**: Clean typography with subtle primary accent dividers.
  - **Compact ATS**: Space-efficient layout designed to fit dense experience into a strict 1-page document.
  - **Executive**: Refined typography highlighting senior leadership and strategic initiatives.
  - **Developer CV**: Technical arsenal matrix placed upfront with project GitHub and live demo links.
- **Job Description Keyword Matcher**: Paste any target job description to instantly analyze keyword match percentage and uncover missing skills.
- **Power Action Verbs Library**: Searchable database of 100+ active verbs categorized by Leadership, Engineering, Optimization, and Execution with weak phrase warnings.
- **Text-Based Vector PDF Export**: Uses client-side `@media print` rules for clean, machine-readable, selectable text vectors that ATS scanners parse flawlessly.
- **Multi-Document Management**: Create, duplicate, rename, and manage multiple tailored CV versions (e.g. Developer CV, Internship CV, General CV).
- **Offline JSON Backup & Restore**: Export and import `.json` backups anytime across different computers and browsers.
- **Rule-Based CV Quality Checker**: Comprehensive automated audit flagging missing headlines, brief summaries, empty sections, or passive phrasing.

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- **Node.js** (v18.0.0 or higher, v20+ / v22+ / v24+ recommended)
- **npm** (v9+ or v10+)

### 1. Installation

```bash
# Clone or navigate to the project directory
cd cvbuilder

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production

```bash
npm run build
```

The production assets will be generated in the `dist/` directory.

---

## 🌐 Deploying to Vercel

Smart CV Builder is fully configured for zero-configuration, lightning-fast deployment on Vercel:

### Method 1: Deploy with Vercel Git Integration (Recommended)

1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** > **"Project"**.
4. Import your `cvbuilder` repository.
5. Vercel automatically detects the **Vite** framework:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**. Your application will be live with free global CDN and HTTPS in seconds!

### Method 2: Deploy using Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy directly from terminal
vercel
```

The included `vercel.json` provides rewrite rules ensuring that SPA client routing and static assets load seamlessly without 404 errors.

---

## 📂 Project Architecture

```
cvbuilder/
├── index.html                   # HTML entry point with fonts & SEO metadata
├── vercel.json                  # Vercel SPA deployment configuration
├── package.json                 # Dependencies and build scripts
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Central router, state, and modal orchestrator
│   ├── index.css                # Tailwind CSS imports & @media print styles
│   ├── types/
│   │   └── cv.ts                # TypeScript interfaces for CV, documents, ATS & audits
│   ├── data/
│   │   ├── actionVerbs.ts       # Categorized power verbs & weak phrase dictionary
│   │   └── sampleResumes.ts     # Software Engineer, Product Manager & Blank profiles
│   ├── utils/
│   │   ├── atsAnalyzer.ts       # ATS compatibility scoring & job keyword matcher
│   │   ├── qualityChecker.ts    # Rule-based CV quality audit engine
│   │   ├── storage.ts           # Multi-document localStorage persistence & JSON backup
│   │   └── textExporter.ts      # Structured plain text (.txt) resume generator
│   └── components/
│       ├── Navbar.tsx           # Responsive header with branding and navigation
│       ├── Footer.tsx           # Professional footer with privacy notice trigger
│       ├── AtsScoreCard.tsx     # Real-time score meter & audit shortcuts
│       ├── CVQualityChecker.tsx # Detailed quality issues modal
│       ├── Pages/
│       │   ├── HomePage.tsx     # Landing page with hero, how-it-works, trust badges
│       │   ├── TemplatesPage.tsx# Template gallery with features & "Use Template" CTA
│       │   ├── MyCvsDashboard.tsx # Multi-document manager (create, duplicate, delete)
│       │   └── PrivacyPage.tsx  # Transparent storage architecture & data purge
│       ├── Editor/
│       │   ├── EditorSidebar.tsx# Tabbed section navigator & readiness meter
│       │   ├── PersonalInfoForm.tsx # Contact, headline, summary & anti-bias fields
│       │   ├── ExperienceForm.tsx   # Reverse chronological roles with STAR helper
│       │   ├── SkillsForm.tsx       # Tag-based categorized skills with quick-add chips
│       │   ├── EducationForm.tsx    # Academic qualifications, passing years, coursework
│       │   ├── ProjectsForm.tsx     # Technical systems, tech stacks, GitHub/live links
│       │   ├── CertificationsForm.tsx# Industry certifications & credential IDs
│       │   ├── AdditionalSectionsForm.tsx# Volunteer, awards, courses, languages, custom
│       │   ├── SectionManager.tsx   # Reorder sections & toggle visibility
│       │   ├── ActionVerbsModal.tsx # Searchable action verbs library
│       │   └── JobMatcherModal.tsx  # Job description keyword gap matcher
│       ├── Preview/
│       │   ├── ResumeDocument.tsx   # Document canvas applying font, scale, and paper styles
│       │   ├── PreviewControls.tsx  # Template selector, zoom, and vector PDF download
│       │   └── Templates/
│       │       ├── ClassicTemplate.tsx   # Classic ATS Harvard single-column
│       │       ├── ModernTemplate.tsx    # Modern Professional with accent dividers
│       │       ├── CompactTemplate.tsx   # Space-efficient 1-page ATS
│       │       ├── ExecutiveTemplate.tsx # Executive & leadership design
│       │       └── DeveloperTemplate.tsx # Developer CV with technical arsenal
│       └── Modals/
│           ├── PrivacyModal.tsx     # First-visit privacy acknowledgment modal
│           └── ImportExportModal.tsx# Offline JSON backup and restore dialog
```

---

## 🔒 Privacy & Local Storage Architecture

- **No Remote Telemetry**: Smart CV Builder transmits zero CV records, form data, or contact details to any server, tracking service, or external AI API.
- **Device-Bound Storage**: Drafts reside in your browser's `localStorage` under `smart_cv_documents_v1`.
- **Manual Backups**: Use the **Backup / Restore** feature to export a `.json` backup file for long-term archival or moving across devices.
- **Data Purge**: You can completely erase all application data at any time via the **Privacy Policy** page.

---

## 📄 License

MIT License. Free to use for students, job seekers, and developers worldwide.
