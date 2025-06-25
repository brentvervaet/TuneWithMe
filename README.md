# Exam Assignment Front-end Web Development & Web Services

## Requirements

Expected software to be already installed:

- [NodeJS](https://nodejs.org)
- [Pnpm](https://pnpm.io)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Run

You can access the application here: [https://tunewithme.onrender.com/home](https://tunewithme.onrender.com/home)

## Project Structure

- `backend/`: Node.js REST API with Express, using MySQL for data storage. Includes authentication, user management, instruments, notes, tunings, and Spotify integration. Tests are written with Jest and Supertest.
- `frontend/`: React application using Vite. Includes pages and components for instrument management, tunings, notes, and more. End-to-end tests are written with Cypress.

## Back-end

### Starting

1. `cd backend`
2. `pnpm i`
3. `pnpm create-env`
4. `pnpm start` OR `pnpm dev`

### Testing

1. `cd backend`
2. `pnpm create-env`
3. `pnpm test`

### Notes

- Environment variables are managed via `.env` (see `pnpm create-env`).
- Database migrations and seeds are in `src/data/migrations/` and `src/data/seeds/`.
- Test coverage reports are generated in `__tests__/coverage/`.

## Front-end

### Starting

1. `cd frontend`
2. `pnpm create-env` (create `.env`)
3. `pnpm i` (install dependencies)
4. `pnpm dev`

### Testing

1. `cd frontend`
2. `pnpm create-env` (create `.env`)
3. `pnpm i` (install dependencies)
4. `pnpm test`

### Notes

- Main entry point: `src/main.jsx`
- API calls are managed in `src/api/`
- Cypress tests are in `cypress/e2e/`
- Static assets and screenshots are in `images/`