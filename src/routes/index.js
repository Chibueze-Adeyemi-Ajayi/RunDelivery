const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const express = require('express');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

// Health Check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Assessment Route
router.get('/assessment', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: [
            {
                question: 'Question 1: Challenges with 1000+ Frequent Updates',
                answer: [
                    'Server Overload: High frequency of incoming requests can exhaust CPU and memory resources.',
                    'Database Bottlenecks: Synchronous database writes for every update can create a massive queue and slow down the entire system.',
                    'Massive Data Growth: Storing every single historical coordinate point can lead to rapid storage depletion.',
                    'Increased Latency: Network congestion and processing delays can result in stale location data being shown to customers.'
                ]
            },
            {
                question: 'Question 2: How to Scale a Real-Time System',
                answer: [
                    'Event-Driven Architecture: Use a robust message queue system (like RabbitMQ or Kafka) to decouple data ingestion from processing.',
                    'Horizontal Scaling: Utilize containerization (Docker/Kubernetes/Swarm) to spin up multiple instances of the API and WebSocket servers behind a load balancer.',
                    'WebSocket Optimization: Use a distributed WebSocket strategy (using Redis Adapter) to sync messages across multiple server nodes.',
                    'Geospatial Indexing: Implement specialized database indexing (like MongoDB\'s 2dsphere) to optimize "nearby" queries.'
                ]
            },
            {
                question: 'Question 3: Redis vs. Message Broker',
                answer: 'Using redis or message broker is a choice of functionality, redis would be used for quick I/O operation of data and message broker excels at interprocess communication between different services.'
            },
            {
                question: 'Question 4: What happens if a client is offline when the event occurs?',
                answer: 'When a client is offline, they miss the event entirely in a standard WebSocket implementation. The server attempts to push the data, but since the connection is broken, the packet is discarded. Socket.IO does not buffer events for offline clients by default.'
            },
            {
                question: 'Question 5: How can the client get the correct status after reconnecting?',
                answer: 'To get the correct status after reconnecting, the client should immediately trigger a pull-based socket event to fetch the current authoritative state from the database. Other methods include redis for caching previous data that might have been lost.'
            }
        ]
    });
});

// Health Check
router.head('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});
module.exports = router;
