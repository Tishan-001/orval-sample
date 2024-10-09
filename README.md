# React Express Vite Project

This project is a full-stack application built with **React** on the frontend, **Express** for the backend, and **Vite** as the build tool. The backend API documentation is provided using **Swagger**, and the client API code is generated with **Orval**.

## Project Structure


Project Structure
graphql
Copy code
root/
├── pet-frontend/         # React frontend (Vite)
├── pet-backend/         # Express backend
└── README.md       # Project documentation
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js v18.x or later
NPM or Yarn
Git
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-repo.git
Navigate to the project directory:

bash
Copy code
cd your-repo
Install dependencies for both frontend and backend:

bash
Copy code
# Install backend dependencies
cd pet-backend
npm install

# Install frontend dependencies
cd ../pet-frontend
npm install
Running the Application
Start the backend server:

Navigate to the server directory and run:

bash
Copy code
npm run dev
Start the frontend (Vite):

In the client directory, run:

bash
Copy code
npm start
Access the app:

Open your browser and navigate to http://localhost:3000 (or the port defined in your Vite config).

API Documentation
The backend API documentation is generated using Swagger.
To view the API documentation, start the backend server and go to http://localhost:8080/api-docs.
Generating API Client with Orval
To generate the client-side API from the Swagger documentation using Orval:

Ensure the backend server is running.

Run the Orval generation script:

bash
Copy code
npm run generate:client
This will generate the API client based on the Swagger specs
