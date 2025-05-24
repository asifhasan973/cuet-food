# Smart Campus Food Ordering System

A full-stack solution for smart campus food ordering, supporting students, vendors, and admins. This repository contains both backend and frontend (see below) documentation.

---

## Features

- User registration and authentication (students, vendors, admins)
- Vendor menu item CRUD (create, read, update, delete)
- Student menu item browsing with flexible filtering (by vendor, price, etc.)
- Order placement and management
- SSLCommerz payment gateway integration
- Role-based access and security best practices
- MongoDB (Mongoose) for data storage
- Express.js RESTful API
- CORS enabled for frontend-backend integration

---

## Project Structure

```
backend/                  # Node.js Express API
├── src/
│   ├── app.js
│   ├── config/           # Database connection, Firebase Admin SDK setup, SSLCommerz keys
│   ├── middleware/       # Auth verification, role checks
│   ├── models/           # MongoDB schemas (Mongoose)
│   ├── controllers/      # Business logic, interact with services/models
│   ├── routes/           # API endpoint definitions
│   ├── services/         # External integrations (SSLCommerz)
│   └── utils/            # Helper functions (email validation)
├── package.json
└── .env.example

frontend/                 # React (Vite/Next.js) or similar SPA
├── public/               # Static assets (images, favicon, etc.)
├── src/
│   ├── components/       # Reusable UI components (forms, cards, etc.)
│   ├── pages/            # Page-level components (routing targets)
│   ├── hooks/            # Custom React hooks (API, auth, etc.)
│   ├── utils/            # Frontend utility functions
│   ├── services/         # API service functions (fetch, axios, etc.)
│   ├── contexts/         # React context providers (auth, user, cart)
│   ├── styles/           # CSS/SCSS modules or global styles
│   └── App.js            # Main app entry point
├── package.json
└── .env.example
```

---

## API Endpoints (Backend)

A full list with request/response details is in `docs/API_Endpoints.md`. Here is a summary:

| Endpoint                   | Method | Description                             |
| -------------------------- | ------ | --------------------------------------- |
| /api/users/register        | POST   | Register a new user                     |
| /api/users/:id             | GET    | Get user by Mongo ObjectId              |
| /api/users/email/:email    | GET    | Get user by email                       |
| /api/users                 | GET    | List users (role-based access)          |
| /api/vendor/menu-items     | POST   | Vendor creates a menu item              |
| /api/vendor/menu-items     | GET    | Vendor gets their menu items            |
| /api/vendor/menu-items/:id | PUT    | Vendor updates a menu item              |
| /api/vendor/menu-items/:id | DELETE | Vendor deletes a menu item              |
| /api/student/menu-items    | GET    | Student views menu items (with filters) |
| /api/student/purchase      | POST   | Student places an order (with payment)  |
| /api/payment/success       | POST   | Payment success callback (SSLCommerz)   |
| /api/payment/fail          | POST   | Payment failure callback (SSLCommerz)   |

See the [API docs](/docs/API_Endpoints.md) for request/response formats and more endpoints.

---

## Backend Setup

1. Clone the repository
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure your `.env` file (see `.env.example`)
4. Start the server:
   ```powershell
   npm run dev
   ```

---

## Frontend

The frontend is a modern single-page application (SPA) built with React (Vite/Next.js or similar). It provides an intuitive and responsive user interface for students, vendors, and admins to interact with the smart campus food ordering system.

### Key Features

- Student, vendor, and admin dashboards
- User authentication and role-based access
- Menu browsing with filtering and search
- Order placement and payment integration (SSLCommerz)
- Vendor menu management (CRUD)
- Real-time order status updates
- Responsive design for mobile and desktop

### Project Structure (see above)

- **components/**: Reusable UI elements (forms, cards, modals, etc.)
- **pages/**: Route-based page components (e.g., Home, Login, Dashboard)
- **hooks/**: Custom React hooks for API calls, authentication, etc.
- **services/**: API service functions for backend communication
- **contexts/**: React context providers for global state (auth, user, cart)
- **styles/**: CSS/SCSS modules or global styles
- **public/**: Static assets (images, favicon, etc.)

### Setup (example)

1. Navigate to the `frontend/` directory
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure your `.env` file (see `.env.example`)
4. Start the development server:
   ```powershell
   npm run dev
   ```

---

## License

MIT
