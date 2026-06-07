# Project Management Frontend

React + TypeScript frontend for a full-stack project management app. Users can register, log in, manage projects, and organize tasks on a drag-and-drop Kanban board. A dashboard shows project and task analytics.

This app talks to the Express + MongoDB API in the sibling `Backend` folder.

## Tech Stack

- **React 19** with **TypeScript**
- **Vite** — dev server and build tool
- **Redux Toolkit** — global state (auth, projects, tasks, theme)
- **React Router** — client-side routing
- **Tailwind CSS 4** — styling
- **Axios** — HTTP client
- **React Hook Form + Zod** — form validation
- **@dnd-kit** — drag-and-drop task board
- **Recharts** — dashboard charts

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- Backend API running (see `../Backend`)
- MongoDB running locally or via a hosted connection configured in the backend

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local env file from the example:

   ```bash
   cp .env.example .env
   ```

3. Start the backend (from the `Backend` directory):

   ```bash
   npm install
   npm run dev
   ```

4. Start the frontend dev server:

   ```bash
   npm run dev
   ```

5. Open the URL shown in the terminal (Vite defaults to `http://localhost:5173`).

## Environment Variables

Vite only exposes variables prefixed with `VITE_`. Copy `.env.example` to `.env` and adjust as needed.

| Variable        | Required | Default                         | Description                                      |
| --------------- | -------- | ------------------------------- | ------------------------------------------------ |
| `VITE_API_URL`  | No       | `http://localhost:5000/api`     | Base URL for the backend API                     |

Example `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

If `VITE_API_URL` is not set, the app falls back to `http://localhost:5000/api` (see `src/APIRoutes/axiosCall.ts`).

**Note:** After changing env values, restart the Vite dev server.

The backend uses its own env file (`../Backend/.env`). Make sure `PORT` and `FRONTEND_URL` there match your setup so CORS works correctly.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server with HMR       |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Project Structure

```
src/
├── APIRoutes/          # Axios instance and API route helpers
├── components/
│   ├── common/         # ErrorBoundary, ProtectedRoute, loaders
│   ├── dashboard/      # Charts and metric cards
│   ├── form/           # Form field wrappers
│   ├── layout/         # Auth and dashboard layouts, sidebar, navbar
│   ├── projects/       # Project forms
│   ├── tasks/          # Kanban board, task cards, task forms
│   └── ui/             # Reusable UI primitives (Button, Input, Modal, etc.)
├── hooks/              # useAuth, useErrorToast, useChartTheme
├── pages/              # Route-level page components
├── store/
│   └── slices/         # Redux slices (auth, projects, tasks, theme, users)
├── types/              # Shared TypeScript types
└── utils/              # Validation, API mappers, status helpers
```

## Routes

| Path               | Access    | Description                    |
| ------------------ | --------- | ------------------------------ |
| `/login`           | Public    | Sign in                        |
| `/register`        | Public    | Create an account              |        |
| `/dashboard`       | Protected | Analytics and overview         |
| `/projects`        | Protected | Create and manage projects     |
| `/tasks`           | Protected | Kanban task board              |

Protected routes require a valid JWT stored in `localStorage`.

## Related

- **Backend API:** `../Backend` — Express server on port `5000` by default
- **Backend env:** See `../Backend/.env.example` for `MONGODB_URI`, `JWT_SECRET`, etc.
