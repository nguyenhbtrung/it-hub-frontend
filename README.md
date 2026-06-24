# IT Hub Frontend

A modern E-Learning web platform for IT student built with Next.js, TypeScript, and MUI. This repository hosts the web application for user learning flows, instructor course management, and admin dashboards.

> Backend repository: https://github.com/nguyenhbtrung/it-hub-backend

## What this project does

IT Hub Frontend is a multi-role education marketplace client application with:

- authenticated user experience for learners, instructors, and admins
- course discovery, enrollment, lessons, and learning progress
- instructor course creation, content management, and submission review
- admin controls for users, categories, courses, tags, and instructor registration
- profile management
- AI learning assistant chatbot in learning screen

## Why it is useful

This app is useful when building or extending an e-learning platform because it provides:

- a complete frontend foundation for role-based course workflows
- integration with `next-auth` credential authentication and API-driven sessions
- rich content editing and course management tools
- integrated AI assistant, enabling students to ask questions and receive context-aware explanations while learning
- responsive layouts using Material UI and modern React features
- scalable route structure with Next.js App Router

## Key features

- User dashboard, course library and profile
- Instructor workflows for course editing, exercises, and student submissions
- Admin panels for moderation, course approval, and user management
- File upload strategy support for direct or signed uploads
- Rich text editor support via TipTap and dynamic content rendering
- Global state management with Zustand
- AI learning assistant chatbot in learning screen

## Getting started

### Requirements

- Node.js 20+ (recommended)
- npm, yarn, or pnpm

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the repository root and set at least:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

Optional variables:

```env
NEXT_PUBLIC_UPLOAD_STRATEGY=direct
```

> The frontend expects a backend API at `NEXT_PUBLIC_API_BASE_URL`.

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
npm start
```

## Project structure

- `src/app/` — Next.js App Router routes and layouts
- `src/components/` — reusable UI components and page sections
- `src/features/` — domain-specific API call, business logic and feature modules
- `src/lib/` — API clients, fetchers, and shared utilities
- `src/contexts/` — React context providers for UI and notifications
- `src/theme/` — Material UI theme and design system configuration

## Technical stack

- Next.js 16
- React 19
- TypeScript
- Material UI (MUI)
- next-auth
- Zustand
- TipTap rich text editor
- Sass for component styling

## How to get help

If you need help with this project:

- open an issue in the repository
- search for existing issues and discussions
- inspect the `src/app/` routes and `src/components/` for UI behavior

## Contributing

Contributions are welcome via issues and pull requests. Keep changes focused on small, testable updates.

## Notes

- If backend services change, update `NEXT_PUBLIC_API_BASE_URL` accordingly.
