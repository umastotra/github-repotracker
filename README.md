# GitHub Repo Tracker – MVP

A full-stack web application to track GitHub repositories and view their latest release activity.
![Github Repo Tracker](https://github.com/user-attachments/assets/53c9967a-1753-4483-9411-6602bfef9545)


---

## Tech Stack

- **Frontend**: React, TypeScript, Apollo Client, TailwindCSS
- **Backend**: Node.js, GraphQL (Apollo Server), Octokit
- **Database**: PostgreSQL (via Prisma)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/github-repotracker.git
cd github-repotracker
```

### 2. Install Dependencies

Install packages in both the frontend and backend:

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Start PostgreSQL with Docker

> Requires Docker installed and running.
> This will start a PostgreSQL instance on port `5432` with default credentials.

```bash
docker-compose up -d
```

### 4. Set Up the Database Schema

Inside the `/server` directory:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Note:
Create /server/.env file for database configs if not exists and add following

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/repotracker"

### 5. Seed the Database (Optional)

To add sample repositories for testing:

```bash
npm run seed
```

### 6. Start the Backend Server

This will start the GraphQL server on `http://localhost:4000`:

```bash
npm run dev
```

### 7. Start the Frontend App

From the `/client` directory, run:

```bash
npm start
```

The React app will run on `http://localhost:3000` and connect to the backend automatically.
