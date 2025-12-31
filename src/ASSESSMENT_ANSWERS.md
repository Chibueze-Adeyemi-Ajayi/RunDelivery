# Assessment Answers - Backend Developer (Real-Time Logistics)

## Question 1: Real-Time Driver Location Updates

### 3. Explanation

**Preventing Unauthorized Users:**
- **Authentication Handshake:** I implement an authentication middleware in `SocketService` (`io.use`). Before a connection is established, the client must send a valid JWT token in the handshake.
- **Room Authorization:** When a client emits `join_order`, we verify if the user (extracted from the token) is authorized to view that specific `orderId` (e.g., they are the customer or the driver for that order). If not, we disconnect them or ignore the request.

**Handling Driver Disconnection:**
- **Cleanup:** On `disconnect`, we identify if the socket belonged to a driver.
- **State Update:** We can update the driver's status in the database to 'offline' or 'disconnected'.
- **Notification:** We emit a `driver_disconnected` event to the customer room so the frontend can show a "Connecting..." or "Driver Offline" status.
- **Graceful Reconnection:** Use client-side logic to attempt reconnection automatically. On the backend, handle ephemeral disconnection vs. permanent via timeouts.

## Question 2: Order Status Events

### 3. Explanation

**Client Offline During Event:**
- If a client is offline, they miss the ephemeral WebSocket event (`emit`).
- **Solution:** The event should not be the *only* source of truth. The database is the source of truth.

**Getting Correct Status After Reconnecting:**
- **Fetch on Reconnect:** When the client reconnects (Socket `connect` event), the frontend should immediately make a REST API call (e.g., `GET /api/v1/orders/:id`) to fetch the current status.
- **Event Replay (Advanced):** Alternatively, we could implement an event log/outbox pattern where the client sends the ID of the last event they received, and the server replays subsequent events. For this assessment, "Fetch on Reconnect" is the standard robust solution.

## Question 3: Scaling & Performance

**1. Problems with 1,000+ drivers sending updates every few seconds:**
- **High CPU/Network Load:** 1,000 drivers * 1 update/sec = 1,000 requests/sec. Node.js event loop might get blocked if processing is heavy.
- **Database Bottleneck:** Writing every single location point to MongoDB will crush the database IOPS.
- **Socket Limit:** Depending on the server configuration (file descriptors), a single instance might hit connection limits.

**2. Scaling the Real-Time System:**
- **Horizontal Scaling:** Run multiple instances (nodes) of the backend server behind a load balancer (Nginx/AWS ELB).
- **Sticky Sessions:** Ensure clients stay connected to the same instance (required for simple Socket.IO), OR use a Redis Adapter.
- **Redis Adapter:** Use `socket.io-redis` to allow broadcasting events across different server instances. If Driver A is on Server 1 and Customer B is on Server 2, Redis acts as the bridge to pass the message between them.

**3. Redis vs. Message Broker:**
- **I would use Redis.**
- **Why?**
    - **Speed:** Redis is in-memory and extremely fast for pub/sub operations required for real-time location.
    - **Suitability:** It is the standard solution for scaling Socket.IO (via the Redis Adapter).
    - **Features:** It handles the pub/sub seamlessly and can also be used to cache the "latest location" to avoid hitting the main database (MongoDB) for every ping. A heavy message broker like RabbitMQ or Kafka might be overkill just for ephemeral location broadcasting, though they are useful for the *Order Status* events if we need guaranteed delivery processing.
