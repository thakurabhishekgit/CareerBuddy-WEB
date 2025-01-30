🚀 Career Buddy - AI-Powered Career Guidance System

🌟 Overview

Career Buddy is an advanced AI-driven career guidance platform designed to help students make informed career decisions. Using machine learning, it predicts the best career paths based on students' interests, academic performance, and uploaded images. The platform also connects students with experienced mentors and provides administrative tools for schools and colleges to manage students effectively.


---

🔥 Key Features

🎯 AI-Based Career Prediction

✨ Predicts the best career options based on:
✔️ Academic Marks
✔️ Personal Interests
✔️ Uploaded Images & Documents

🎥 Mentor-Guided Learning

👨‍🏫 Mentors can upload video content to guide students on various career paths.
📚 Students can watch and learn from expert insights.

🎓 College Admission Assistance

🏫 College Admins manage student applications and provide admission guidance.
📄 Helps students apply to colleges based on AI recommendations.

🏫 School Management & Student Activity Monitoring

🎒 School Admins control student activities, monitor progress, and provide career suggestions.
📊 Track student performance and engagement with mentors.

🔐 Secure Authentication & Role-Based Access

🔑 Different user roles with specific permissions:

🧑‍🎓 Students → Explore careers, take assessments, and learn from mentors.

👨‍🏫 Mentors → Upload educational videos and guide students.

🏫 School Admins → Monitor student activity and ensure engagement.

🎓 College Admins → Oversee student admissions and career opportunities.



---

🚀 How It Works?

1️⃣ Student Registers → Creates a profile and inputs academic data.
2️⃣ Career Prediction → AI suggests the best career paths.
3️⃣ Mentor Learning → Students explore career-related videos.
4️⃣ College Applications → Apply for colleges based on AI recommendations.
5️⃣ Admin Monitoring → School and college admins oversee student activities.


---

🛠 Technology Stack

🟢 MERN Stack (MongoDB, Express.js, React.js, Node.js)
🧠 Machine Learning & AI (Career prediction models)
🎞 Video Streaming (For mentor-led sessions)
🔒 JWT Authentication (For secure access control)
The Career Buddy platform addresses the critical gap in career counseling and guidance in schools, which
often leads to uninformed career choices and mismatched skills among students. By harnessing the power
of artificial intelligence, the platform provides personalized career advice tailored to individual strengths,
interests, and market trends. Key features include mentorship programs connecting students with
professionals, interactive career exploration tools with simulations and videos, and a comprehensive
resource portal offering insights into various career paths and educational requirements. This innovative
approach aims to empower students to make informed decisions, bridge the skills gap, and align their
aspirations with real-world opportunities, fostering social mobility and reducing career-related anxiety.

The Career Buddy platform integrates advanced technologies and methodologies, including:
AI-Powered Career Guidance: Personalized career advice based on individual strengths, interests, and
market trends.
Mentorship Programs: Professional guidance tailored to students' career aspirations.
Interactive Career Exploration: Virtual simulations and interactive content to explore diverse career
paths.
Comprehensive Career Resources: Centralized portals detailing career options, skills, pathways, and
trend

Packages to Install
Node.js: Ensure you have Node.js installed on your system. Download it from Node.js Official Website.
Express: A fast, unopinionated web framework for Node.js.
Mongoose: For MongoDB interaction.
bcrypt: To hash passwords securely.
jsonwebtoken: To implement authentication using JWT.
dotenv: To manage environment variables securely.
multer: To handle file uploads (e.g., videos).
cors: To enable cross-origin requests (optional for frontend-backend interaction).
nodemon (optional): Automatically restarts the server when file changes are detected

# Initialize Node.js project

npm init -y

# Install required packages

npm install express mongoose bcrypt jsonwebtoken dotenv multer cors

# Install development dependencies (optional)

npm install --save-dev nodemon

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key

go to directory
cd backend
run the command
nodemon server.js

FRONTEND----

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Install Packages
Run the following commands to initialize and install dependencies for the frontend:

Navigate to your frontend folder:

bash
Copy code
cd frontend
npm install
npm run dev
Key Installed Dependencies
Here are some of the important packages from your package.json:

React Ecosystem:

react, react-dom: Core React library.
react-router-dom: For routing.
react-icons: For adding icons.
react-redux: Redux state management.
Utilities:

axios: For making HTTP requests.
lodash: Utility functions.
react-toastify: Toast notifications.
styled-components: CSS-in-JS styling.
Visualization:

chart.js, react-chartjs-2: For charts and graphs.
Frontend Development Tools:

vite: Fast development server.
eslint: Linter for JavaScript/React.
@vitejs/plugin-react: React plugin for Vite.

VITE v5.3.4 ready in 120 ms

➜ Local: http://localhost:3000/
➜ Network: use --host to expose

directly install
rm -rf node_modules package-lock.json
npm install
