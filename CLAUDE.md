# CLAUDE.md
必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a customer management practice project with a Next.js frontend and Laravel API backend:

- **Frontend**: Next.js 15 app with TypeScript, Tailwind CSS, and React Hook Form
  - Located in the root directory (`/app`, `/public`, etc.)
  - Uses App Router architecture
- **Backend**: Laravel 12 API with Sanctum authentication
  - Located in `/customer-api/` directory
  - Uses SQLite database (`database/database.sqlite`)
  - Implements token-based authentication with custom `memberId` field

## Development Commands

### Frontend (Next.js)
```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint check
npm run lint
```

### Backend (Laravel)
```bash
# Navigate to Laravel directory first
cd customer-api

# Development server with all services (server, queue, logs, vite)
composer dev

# Run tests
composer test
# or
php artisan test

# Database operations
php artisan migrate
php artisan db:seed

# Start individual services
php artisan serve
php artisan queue:listen
php artisan pail
```

### Combined Development
The Laravel `composer dev` command runs all services concurrently:
- PHP server (port 8000)
- Queue worker
- Log monitoring (Pail)
- Vite dev server for assets

## Key Files

- Authentication controller: `customer-api/app/Http/Controllers/AuthController.php`
- API routes: `customer-api/routes/api.php`
- User model: `customer-api/app/Models/User.php`
- Login page: `app/login/page.tsx`

## Authentication Flow

- Users authenticate with `memberId` and `password` (not email)
- Laravel Sanctum provides API token authentication
- Frontend stores and uses Bearer tokens for API requests