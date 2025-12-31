# RunDelivery API

Professional Express.js production-ready codebase using OOP principles.

## Architecture

The project follows a layered architecture:

- **Controllers** (`src/controllers`): Handle HTTP requests and responses. Extend `BaseController`.
- **Services** (`src/services`): Contain business logic. Extend `BaseService`.
- **Models** (`src/models`): Schema definitions (Mongoose).
- **Routes** (`src/routes`): API route definitions.
- **Config** (`src/config`): Configuration and database connection.
- **Utils** (`src/utils`): Utility classes like Logger.

## Prerequisites

- Node.js
- MongoDB

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Configure environment variables:
    Copy `.env.example` to `.env` and update the values.
    ```bash
    cp .env.example .env
    ```

3.  Run the application:
    - Development:
        ```bash
        npm run dev
        ```
    - Production:
        ```bash
        npm start
        ```

## OOP Implementation

- **BaseController**: Provides standardized response methods (`sendResponse`, `sendError`).
- **BaseService**: Provides generic CRUD operations (`findAll`, `findById`, `create`, `update`, `delete`).
- **App Class**: Encapsulates the Express application and server startup logic.
- **Database Class**: Manages database connection state.

## API Documentation

Swagger documentation is available at: `http://localhost:3000/api-docs`

## API Endpoints

- `GET /health`: Health check
- `POST /api/v1/users`: Create a user
- `GET /api/v1/users`: Get all users
- `GET /api/v1/users/:id`: Get user by ID
