# ERA Feedback Portal

A full-stack web application designed for collecting and managing feedback. This portal allows users to submit feedback and provides an admin dashboard for managing and exporting feedback data.

## Features

-   **User Feedback Submission:** A simple and intuitive form for users to submit feedback.
-   **Admin Dashboard:** A secure dashboard for administrators to view, manage, and analyze feedback.
-   **Authentication:** Secure admin login with JWT-based authentication.
-   **Data Export:** Admins can export feedback data to CSV or Excel formats.
-   **Responsive Design:** A modern and responsive user interface built with Tailwind CSS.

## Tech Stack

### Frontend

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool and development server for modern web projects.
-   **React Router:** For client-side routing and navigation.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **Axios:** A promise-based HTTP client for making API requests.

### Backend

-   **Node.js:** A JavaScript runtime for building server-side applications.
-   **Express:** A fast and minimalist web framework for Node.js.
-   **MongoDB:** A NoSQL database for storing application data.
-   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **JWT (JSON Web Tokens):** For implementing secure authentication.
-   **Bcrypt.js:** For hashing passwords before storing them in the database.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [npm](https://www.npmjs.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your actual data.
    ```
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The backend server will start on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The frontend development server will start on `http://localhost:5173` (or another port if 5173 is in use).

## Folder Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   ├── .env          # Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── ...
    └── package.json
```
