# Darklands Backend (Next.js)

This is the backend service for the **Darklands Application**, built with Next.js 15.

## 🚀 Getting Started

1. **Install dependencies** (if not already done):
   ```bash
   cd backend
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.

## 📡 API Endpoints

- `GET /api/events`: Returns the list of festival events from `src/data/events.json`.

## 🏗 Project Structure

- `src/app/api/`: Contains API route handlers.
- `src/app/page.tsx`: The landing page/dashboard for the backend.
- `src/data/`: Static data storage (future migration to database recommended).

## 🔌 Connecting to the Mobile App

To use this backend in the Expo app, update your fetch calls to point to your machine's local IP (e.g., `http://192.168.1.XX:3000/api/events`) instead of `localhost` when testing on a physical device.
