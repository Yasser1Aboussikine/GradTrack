# GradTrack

GradTrack is a comprehensive academic management web application designed to support **all students at Al Akhawayn University (AUI)** — across all schools and majors including SSE (School of Science & Engineering), SBA (School of Business Administration), SSAH (School of Social Sciences & Humanities), and LC (Liberal Commons). 

The platform helps students manage their course selections, build personalized degree plans, receive AI-powered course recommendations, and share course experiences with peers. For **FYE (First-Year Experience) students**, GradTrack offers special tools to create a full 4-year degree plan with automatic prerequisite checks and course classification guidance, removing the hassle of manually tracking complex degree requirements.

---

## Features

### 📚 Academic Course Management for All Students
- Search and explore courses across all schools and majors at AUI.
- Manage your personal course history and track progress toward your degree.
- Receive personalized, AI-driven course recommendations based on your completed courses and academic goals.
- Read and share peer experiences through course-specific comments, accessible only to students who have taken those courses.

### 🎓 Comprehensive Degree Planning for FYE Students
- Create, customize, and save detailed 4-year degree plans semester-by-semester.
- Drag-and-drop courses into semesters with real-time prerequisite validation and warnings.
- Automatically receive notifications about course prerequisites, classifications (core, elective, major requirements), and semester offerings.
- Track degree completion percentages and plan adjustments easily.
- Export degree plans as PDFs for advising sessions or personal records.

### 🤖 AI-Powered Course Recommendations
- Employs collaborative filtering machine learning models trained on anonymized student course data.
- Suggests the best next courses tailored to your academic history and major requirements.
- Improves recommendations over time with synced actual semester data including grades.

### 💬 Course Commenting System
- Secure, moderated comment sections tied to individual courses.
- Only students who have completed a course can post comments to ensure relevant and authentic feedback.
- Enables community-driven insights and discussion about course workload, instructors, and learning tips.

### 🔄 Semester Sync and Progress Updates
- At semester’s end, students can sync actual completed courses and grades.
- Automatically updates progress tracking and enhances the recommendation model accuracy.
- Helps align planned coursework with academic realities and advisor feedback.

---

## Tech Stack

| Layer           | Technologies & Libraries                                  | Purpose                                                                 |
|-----------------|----------------------------------------------------------|-------------------------------------------------------------------------|
| Frontend        | React + TypeScript + Tailwind CSS                         | Responsive UI, interactive planner, course search, comments             |
| State Management| Zustand or Redux Toolkit                                  | Manage user state, degree plans, and UI state                           |
| Forms & Validation | React Hook Form + Zod                                    | User input forms with robust validation                                |
| Backend         | Node.js + Express + TypeScript                            | REST API server, business logic, authentication                        |
| ORM & Database  | Prisma ORM + PostgreSQL                                   | Database schema management, querying, and migrations                   |
| Authentication  | JWT or Auth0/Clerk                                       | Secure user authentication and authorization                           |
| Machine Learning| Python (Surprise, LightFM)                                | Collaborative filtering for course recommendations                     |
| Visualization   | Mermaid.js, React Flow                                   | Visualizing course prerequisites and degree progress                   |
| Export & Notifications | jsPDF, Nodemailer, EmailJS                            | Export degree plans as PDF, email notifications                        |
| Deployment      | Vercel (Frontend), Railway/Render (Backend + Database)    | Hosting and continuous deployment                                     |

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)  
- PostgreSQL Database  
- Python 3.x (for ML scripts)  
- Package managers: npm or Yarn  

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/gradtrack.git
cd gradtrack

2. Backend Setup:

cd server
npm install
npx prisma generate  
npx prisma migrate dev
npm run dev

3. Frontend Setup:

cd ../web
npm install
npm run dev

### Folder Structure:

gradtrack/
├── backend/            # API server (Node.js + Express + Prisma)
│   ├── prisma/         # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
├── frontend/           # React + TypeScript frontend app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.tsx
├── ml/                 # Python scripts for ML course recommendations
│   ├── train.py
│   ├── recommend.py
│   └── requirements.txt
└── README.md

###Contribution
Contributions, bug reports, and feature requests are welcome! Please open an issue or submit a pull request.

###License
This project is licensed under the Apache 2.0 License.

###Contact
For questions or collaboration, contact **yasser1aboussikine@gmail.com**.
