#  Task Manager Full Stack App

##  Features
- User Authentication (JWT)
- Role-Based Access (Admin/User)
- Task CRUD (Create, Read, Update, Delete)
- Modern React UI
- Secure password hashing

##  Tech Stack
- Backend: Node.js, Express, Prisma
- Database: PostgreSQL (Supabase)
- Frontend: React (Vite)

---

##  Setup Instructions

### Backend
cd backend  
npm install  
npm run dev  

### Frontend
cd frontend  
npm install  
npm run dev  

---

##  Demo
Run locally:
- Backend: http://localhost:5000  
- Frontend: http://localhost:5173  

---
##  Demo Credentials

Use the following credentials:

Email: test@example.com  
Password: 123456  

Or you can register a new user using the Register API.
##  API Endpoints

---

### Auth
- POST /api/v1/auth/register  
- POST /api/v1/auth/login  

### Tasks
- GET /api/v1/tasks  
- POST /api/v1/tasks  
- PUT /api/v1/tasks/:id  
- DELETE /api/v1/tasks/:id  

---

##  Notes
- JWT used for authentication  
- Prisma ORM for database management  
- Clean and responsive UI  

---



