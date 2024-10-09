# React Express Vite Project

This project is a full-stack application built with **React** on the frontend, **Express** for the backend, and **Vite** as the build tool. The backend API documentation is provided using **Swagger**, and the client API code is generated with **Orval**.

## Installation

Clone the repository and install the necessary dependencies for both the frontend and backend.

## Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
```

## Install backend dependencies
```bash
cd pet-backend
npm install
```

## Install frontend dependencies
```bash
cd ../pet-frontend
npm install
```

## Usage
Start the backend server:
```bash
cd pet-backend
npm run dev
```

Start the frontend:
```bash
cd pet-frontend
npm start
```

Navigate to http://localhost:5173 to access the app.

## API Documentation
The backend API documentation is generated using Swagger. To view it, start the backend server and go to http://localhost:8080/api-docs.

To generate the client-side API from the Swagger documentation using Orval:
```bash
npm run generate:client
```
