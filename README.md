# Anime Watch List

A full-stack web application that allows users to search, save, and manage their favorite anime series. Built with the MERN stack and modern UI tools.

## Live Demo

View App on Render: [https://animewatchlist-6nzu.onrender.com/](https://animewatchlist-6nzu.onrender.com)

## Tech Stack

- Frontend: React, Vite, Chakra UI
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- Authentication: JSON Web Tokens (JWT)
- Security: Password encryption using Bcrypt

## Features

- Search for anime (via external API)
- Add anime to a personal watch list
- Delete or update watch list entries
- User authentication (Signup / Signin)
- Secure password handling (hashed with Bcrypt)

## Getting Started (Local Development)

### Prerequisites

- Node.js and npm
- MongoDB URI (local or cloud)

### Setup

bash
# Clone the repository
git clone https://github.com/Alhamin-Ibrahim/AnimeWatchList.git
cd AnimeWatchList

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install

# Create a .env file in the root of your project
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001

### Running the App

# Backend
npm run dev

#Frontend
cd client
npm run dev

### Folder Structure

/client        # (React + Vite + Chakra UI)
/server        # (Express + MongoDB)
/routes        # route handlers
/controllers   # Controller logic
/config        # DB connection setup

### Production Build

npm run build
npm start
