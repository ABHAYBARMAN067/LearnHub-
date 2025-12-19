# LearnHub

A comprehensive e-learning platform built with MERN stack, featuring user authentication, course management, enrollment tracking, and progress monitoring.

### Home Page
![Home Page](frontend/src/assets/scrhome.png)



 #  ✨ Features
👥 User Roles
🔑 Admin

Create, update, publish, and delete courses

Add course details (title, description, duration, lessons/modules)

Manage multiple courses from admin dashboard

View enrolled students for each course

🎓 Student

Browse available courses

Enroll in courses with a single click

Access enrolled courses via personal dashboard

Track learning progress and completed lessons

🔐 Authentication & Authorization

Secure user registration and login using JWT

Role-based access control (Admin / Student)

Protected routes for authorized users only

📚 Course Management

Structured courses with multiple lessons/modules

Centralized course creation and updates by admin

Real-time course updates across the platform

🧾 Student Enrollment

View all available courses

One-click enrollment system

Separate dashboard for enrolled courses

📊 Progress Tracking

Track completed lessons/modules per course

Automatic calculation of course completion percentage

Visual display of learning progress on dashboard

🔄 System Workflow (High Level)

Admin creates and publishes courses

Student registers and logs in

Student browses available courses

Student enrolls in a course

Student completes lessons/modules

System automatically updates learning progress

📱 User Experience

Fully responsive UI (mobile, tablet, desktop)

Clean and modern design using Tailwind CSS

Smooth navigation with React Router

# Features Summary

- **User Authentication**: Secure login and registration with JWT tokens
- **Email Notifications**: Welcome emails for new registrations and login notifications
- **Role-Based Access**: Separate dashboards for students and administrators
- **Course Management**: Create, update, and delete courses with lessons
- **Enrollment System**: Students can enroll in courses
- **Progress Tracking**: Track lesson completion and overall progress
- **Admin Dashboard**: Manage courses, view statistics
- **Student Dashboard**: View enrolled courses and progress
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS



## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Nodemailer
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Dependencies

### Backend
- bcryptjs: ^2.4.3
- cors: ^2.8.5
- dotenv: ^16.6.1
- express: ^4.22.1
- express-async-handler: ^1.2.0
- jsonwebtoken: ^9.0.3
- mongoose: ^7.8.8
- morgan: ^1.10.1
- nodemailer: ^6.9.7

### Frontend
- @tailwindcss/vite: ^4.1.18
- axios: ^1.6.2
- jwt-decode: ^4.0.0
- react: ^19.2.0
- react-dom: ^19.2.0
- react-router-dom: ^6.20.1
- tailwindcss: ^4.1.18

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git
- Email account (Gmail recommended) with app password for email notifications

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ABHAYBARMAN067/E-Learning-Mini-Platform
   ```

2. Navigate to the project directory:
   ```
   cd E-Learning-Mini-Platform
   ```

3. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

4. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

5. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add your MongoDB connection string, JWT secret, and email configuration:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/elearning
     JWT_SECRET=your_jwt_secret_key_here
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_app_password
     ```
     **Note**: For Gmail, enable 2-factor authentication and generate an app password to use in EMAIL_PASS.

6. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

7. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

8. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

## Project Structure

```
LearnHub/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── jwt.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── progressController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Progress.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── progressRoutes.js
│   └── utils/
│       ├── calculateProgress.js
│       └── generateToken.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── authApi.js
│   │   ├── components/
│   │   │   ├── CourseCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CourseContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useCourse.js
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   └── CreateCourse.jsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Student/
│   │   │       ├── CourseDetail.jsx
│   │   │       └── StudentDashboard.jsx
│   │   ├── utils/
│   │   │   └── constants.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
└── README.md
```