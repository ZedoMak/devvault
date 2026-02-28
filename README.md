# DevVault

A secure platform for managing development resources and user authentication built with Next.js, TypeScript, and Prisma.

## Features

- **Authentication**: Secure user authentication with JWT tokens
- **Role-Based Access Control**: Support for USER, ADMIN, and SUPERADMIN roles
- **Database Management**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript support with Zod validation
- **Modern UI**: Tailwind CSS with dark mode support

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma
- **Authentication**: JWT with bcrypt
- **Styling**: Tailwind CSS
- **Validation**: Zod

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd devvault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update your `.env` file with the required variables:
```
DATABASE_URL="postgresql://username:password@localhost:5432/devvault"
JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters"
JWT_EXPIRES_IN="7d"
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/           # Next.js app router
├── lib/           # Utility libraries
│   ├── auth/      # Authentication utilities
│   ├── services/  # Business logic services
│   ├── utils/     # Helper functions
│   └── validations/ # Zod schemas
├── middleware.ts  # Next.js middleware for auth
└── types/         # TypeScript type definitions
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `JWT_EXPIRES_IN` | JWT token expiration time | No (default: 7d) |
| `NODE_ENV` | Environment (development/production) | No (default: development) |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Database

This project uses PostgreSQL with Prisma. The schema includes:

- **Users**: User accounts with roles and authentication
- **Sessions**: JWT session management
- **Audit Logs**: Activity tracking

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection with Next.js
