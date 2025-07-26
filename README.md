# GradTrack

GradTrack is a comprehensive web application designed to help AUI First-Year Experience (FYE) students plan their academic journey, get AI-driven course recommendations, share course experiences, and sync actual semester results. This tool empowers students to build, visualize, and track their degree plans effectively while fostering community insights and personalized suggestions.

---

## Features

- **Interactive Degree Planner**  
  Visual roadmap builder allowing drag-and-drop course planning per semester with real-time prerequisite validation.

- **Progress Tracking**  
  Monitor degree completion percentages for major requirements, electives, and university core.

- **AI-Powered Course Recommendations**  
  Collaborative filtering model suggests optimal next courses based on historic student data.

- **Course Comments**  
  Students can share feedback and experiences on courses they have completed.

- **Semester Syncing**  
  Update actual courses taken and grades at semester end to keep plans aligned with reality and improve recommendations.

---

## Tech Stack

| Layer           | Technology                                   |
|-----------------|----------------------------------------------|
| Frontend        | React, TypeScript, Tailwind CSS              |
| State Management| Zustand or Redux Toolkit                      |
| Backend         | Node.js, Express, TypeScript                  |
| Database        | PostgreSQL, Prisma ORM                        |
| Authentication  | JWT or Auth0/Clerk                           |
| Machine Learning| Python, Surprise or LightFM (Collaborative Filtering) |
| Visualization   | Mermaid.js or React Flow for prerequisite graphs |
| Deployment      | Vercel (Frontend), Railway/Render (Backend)  |

---

## Getting Started

### Prerequisites

- Node.js (v16+)  
- PostgreSQL database  
- Python 3.x (for ML model training)  
- Yarn or npm package manager  

### Installation

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/gradtrack.git
cd gradtrack
