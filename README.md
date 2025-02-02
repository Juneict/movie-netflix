# Nextflix Web Application

## Project Overview

Nextflix is a web application for viewing movie information developed using **Next.js** for the frontend and **NestJS** for the backend.

### Features
- **Responsive Design**: The application supports desktop, tablet, and mobile views.
- **Movie Data**: The frontend fetches movie data through a custom API developed in NestJS that connects to a third-party movie API.
- **API Gateway**: The backend acts as an API gateway, handling business logic and data transformation.
- **State Management**: The application manages various states (loading, empty, error, success) to ensure smooth user interaction.
- **UI Framework**: Built with **Tailwind CSS** for fast and responsive design.

## Project Structure

### Frontend (Next.js)
- **Responsive Design**: Supports multiple screen sizes (Desktop, Tablet, Mobile).
- **State Management**: Handles various states like loading, empty, error, and success states.

### Backend (NestJS)
- **API Gateway**: Handles the connection between the frontend and the third-party movie API.
- **Data Transformation**: Transforms the movie data to fit the frontend’s requirements.

## Project Setup
1. Clone the repository:
   ```bash
   https://github.com/Juneict/movie-netflix.git
2. Install Frontend Dependencies
   ```bash
   cd frontend
   npm install
   npm run dev
3. Install Backend Dependencies
   ```bash
   cd backend
   npm install
   npm run start:dev
4. Environment Setup For  Frontend
   ```bash
   nano .env
5. Set Environment Variable
   REACT_APP_API_URL
6. Environment Setup For  Backend
   ```bash
   nano .env
5. Set TMDB API Key
   TMDB_API_KEY

