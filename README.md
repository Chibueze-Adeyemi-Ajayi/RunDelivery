# RunDelivery API

A professional, production-ready Node.js/Express backend system built for a generic logistics and delivery tracking application. This project demonstrates advanced backend patterns including OOP architecture, real-time WebSocket communication, request validation, Docker containerization, and self-documenting APIs.

## Key Features

- **Layered OOP Architecture**: Separation of concerns using Controllers, Services, and Data Access Layers.
- **RESTful API**: Standardized JSON responses for Users and Orders management.
- **Real-Time Updates**: **Socket.IO** integration for live driver location tracking and order status updates.
- **Production-Grade Logging**: Structured logging using **Winston**.
- **Data Validation**: Request validation middleware using **Joi**.
- **Containerization**: Full Docker and Docker Swarm support.
- **API Documentation**: Interactive Swagger/OpenAPI documentation.
- **Security**: Basic Helmet and CORS configuration.
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

- **Node.js**: v18+ (if running locally)
- **Docker & Docker Compose** (for containerized execution)
- **MongoDB**: Local, Atlas, or via Docker.

## Getting Started

### 1. Local Development (No Docker)

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create a `.env` file in the root directory based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
    *Update `DB_URI` if your MongoDB location differs from the default.*

3.  **Run the Application**
    -   **Development Mode** (hot-reload):
        ```bash
        npm run dev
        ```
    -   **Production Mode**:
        ```bash
        npm start
        ```

### 2. running with Docker Compose (Recommended)

Quickly spin up the API and a local MongoDB instance.

```bash
docker-compose up --build
```
The API will be available at `http://localhost:3000`.

### 3. Running with Docker Swarm

To deploy as a scalable stack (simulating production):

1.  **Initialize Swarm** (if not already done):
    ```bash
    docker swarm init
    ```
2.  **Build the Image**:
    ```bash
    docker build -t rundelivery-api:latest .
    ```
3.  **Deploy the Stack**:
    ```bash
    docker stack deploy -c docker-stack.yml rundelivery_stack
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

## Real-Time Usage (Socket.IO)

The server supports real-time events via **Socket.IO**.

### Developer Hub & Test Apps
A comprehensive **Developer Hub** is available to test and visualize real-time updates.

1.  Navigate to **[http://localhost:3000/test-socket.html](http://localhost:3000/test-socket.html)**
2.  **Live Apps Tab**:
    -   **Driver App**: A dedicated interface to emit location updates (supports auto-move simulation).
    -   **Customer App**: A dedicated interface to join order rooms and visualize incoming driver location on a log.
3.  **Documentation Tab**: Contains step-by-step guides on how to test the real-time flow and a direct link to Swagger docs.


### Events Reference

- **`join_order`** (Client -> Server): Join a room for a specific order.
  - Payload: `orderId` (string)
  
- **`update_location`** (Client -> Server): Driver sends new coordinates.
  - Payload: `{ "orderId": "...", "latitude": 1.23, "longitude": 4.56 }`

- **`driver_location`** (Server -> Client): Broadcasted to the order room when a driver updates location.
- **`order_status_change`** (Server -> Client): Broadcasted when an order status is updated via API.

## License

MIT
