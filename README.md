# RunDelivery API

A professional, production-ready Node.js/Express backend system built for a generic logistics and delivery tracking application. This project demonstrates advanced backend patterns including OOP architecture, real-time WebSocket communication, request validation, and self-documenting APIs.

## Key Features

- **Layered OOP Architecture**: Separation of concerns using Controllers, Services, and Data Access Layers.
- **RESTful API**: Standardized JSON responses for Users and Orders management.
- **Real-Time Updates**: **Socket.IO** integration for live driver location tracking and order status updates.
- **Production-Grade Logging**: Structured logging using **Winston**.
- **Data Validation**: Request validation middleware using **Joi**.
- **API Documentation**: Interactive Swagger/OpenAPI documentation.
- **Security**: Basic Helmet and CORS configuration.
- **Code Quality**: Linting with **ESLint** and formatting with **Prettier**.
- **Database**: **MongoDB** integration via Mongoose.

## Architecture Highlights

The project follows a scalable directory structure:

- **`src/controllers`**: Handle HTTP requests, validate input, and send responses. All controllers extend `BaseController`.
- **`src/services`**: Encapsulate business logic. Extend `BaseService` for generic CRUD operations.
- **`src/models`**: Mongoose schemas defining the data structure.
- **`src/routes`**: API route definitions with Swagger annotations.
- **`src/middlewares`**: HTTP request interceptors (Validation, Auth, etc.).
- **`src/config`**: Centralized configuration and Database connection management.
- **`src/utils`**: Core utilities (Logger, etc.).

## Prerequisites

- **Node.js**: v14+
- **MongoDB**: Local or Atlas instance.

## Getting Started

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create a `.env` file in the root directory based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
    *Update `DB_URI` if your MongoDB location differs.*

3.  **Run the Application**

    - **Development Mode** (with hot-reload):
        ```bash
        npm run dev
        ```
    - **Production Mode**:
        ```bash
        npm start
        ```

## API Documentation

Once the server is running, access the interactive Swagger documentation at:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

### Key Endpoints

- **Users**
    - `POST /api/v1/users` - Register a new user
    - `GET /api/v1/users` - List users
- **Orders**
    - `POST /api/v1/orders` - Create a delivery order
    - `PATCH /api/v1/orders/:id/status` - Update order status (triggers WebSocket event)

## Real-Time Usage (WebSockets)

The server supports real-time events via `Socket.IO`.

- **Drivers**: Connect and emit `update_location` with `{ orderId, latitude, longitude }`.
- **Customers**: Listen to `order_{orderId}` room for `driver_location` and `order_status_change` events.

## License

MIT
