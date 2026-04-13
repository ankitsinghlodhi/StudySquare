# 🚀 StudySquare – EdTech Platform (MERN Stack)

StudySquare is a full-stack EdTech platform where students can explore, purchase, and learn from courses, while instructors can create and manage their own courses. It is built using the MERN stack and follows a scalable client-server architecture.

---

## 🌐 Tech Stack

### 🎨 Frontend

* React.js
* Vite
* Redux Toolkit
* Tailwind CSS

### ⚙️ Backend

* Node.js
* Express.js

### 🛢️ Database

* MongoDB

### ☁️ Other Integrations

* Cloudinary (Media Storage)
* Razorpay (Payments)
* JWT Authentication

---

## ✨ Features

### 👨‍🎓 For Students

* User Signup/Login with OTP verification
* Browse and search courses
* Add to cart & purchase courses
* Enroll and watch course content
* Add reviews and ratings
* Edit profile and manage account

### 👩‍🏫 For Instructors

* Create, edit, and delete courses
* Upload videos and course materials
* View analytics and course performance
* Manage profile and course content

### 🔐 Authentication & Security

* JWT-based authentication
* OTP email verification
* Password encryption using bcrypt
* Protected routes

---

## 🏗️ System Architecture

The StudySquare platform follows a **client-server architecture**:

* **Frontend (React)** → Handles UI and user interactions
* **Backend (Node + Express)** → Handles APIs and business logic
* **Database (MongoDB)** → Stores user, course, and platform data

---

## 📊 Key Functional Modules

* Authentication Module (Signup/Login/OTP)
* Course Management System
* Payment Integration (Razorpay)
* User Dashboard (Student & Instructor)
* Media Management via Cloudinary

---

## 📁 Folder Structure

```
StudySquare/
│
├── frontend/        # React frontend
├── backend/         # Node + Express backend
├── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/ankitsinghlodhi/StudySquare.git
cd StudySquare
```

### 2. Install dependencies

#### Frontend

```
cd frontend
npm install
npm run dev
```

#### Backend

```
cd backend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in backend:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRY=your_expiry
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
```

---

## 📸 Screenshots

Screenshots showcasing the application UI (Home, Dashboard, Course Pages) will be added soon.

---

## 🚀 Future Improvements

* Add real-time chat between student & instructor
* Add course recommendation system
* Improve analytics dashboard
* Enhance mobile responsiveness

---

## 👨‍💻 Author

**Ankit Singh Lodhi**
B.Tech IT | MERN Stack Developer

* GitHub: https://github.com/ankitsinghlodhi

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub and share your feedback!
