# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend integration and authentication

- Configure the backend base URL using the Vite env variable `VITE_API_URL`. Example `.env` in the project root:

	VITE_API_URL=http://localhost:8000/api

Basic usage and running locally:

- Create a `.env` file in the project root using `.env.example` as template:

	cp .env.example .env

- Install dependencies and start Vite dev server:

	npm install
	npm run dev

- The app will start on http://localhost:5173 by default; make sure the backend is running and the `VITE_API_URL` points to your Laravel API backend (by default: `http://localhost:8000/api`).

Authentication notes:

- The login flow uses `contrasena` in the request payload (avoid the `ñ` field name in requests). After logging in, the authentication token is stored in `localStorage` and set automatically in the Authorization header for all subsequent API calls, so the session persists across page reloads.
- To logout, the frontend should clear the token using the helper `setAuthToken(null)` exported from `src/services/api.js`.

Be aware that some endpoints require authentication; make sure to login with a valid user first and that CORS on the backend allows requests from the Vite dev server.

- The login flow uses `contrasena` in the request payload (avoid the `ñ` field name in requests). After logging in, the authentication token is stored in `localStorage` and set automatically in the Authorization header for all subsequent API calls, so the session persists across page reloads.

- To logout, the frontend should clear the token using the helper `setAuthToken(null)` exported from `src/services/api.js`.
