# Job Application Tracker

## Overview
The **Job Application Tracker** is a full-stack web application that helps users manage and track their job applications efficiently. It allows users to add, update, and categorize job applications based on different statuses such as applied, interview, rejected, and offer received.

## Features
- User authentication and authorization
- Add, update, and delete job applications
- Categorization of applications by status
- Responsive UI for desktop and mobile
- Dark/Light theme support
- API integration for CRUD operations
- Modern and clean UI design

## Tech Stack
### Frontend
- **React.js** (Next.js)
- **Tailwind CSS** for styling
- **Axios** for API requests

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** authentication
- **Zod** for input validation

## Installation
### Prerequisites
- Node.js installed
- MongoDB set up (local or cloud-based)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/SanyamMadaan/Student-Job-Tracker.git
   cd client
   npm install
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install
   

3. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```env
   PORT=3000
   DB_URL=Your_DB_URL
   JWT_SECRET=assignment
   ```

4. Run the backend server:
   ```bash
   nodemon index.js
   ```

5. Run the frontend:
   ```bash
   npm run dev
   ```
