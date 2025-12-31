const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        name: String,
        quantity: Number
    }],
    status: {
        type: String,
        enum: ['PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'],
        default: 'PENDING'
    },
    currentLocation: {
        latitude: Number,
        longitude: Number,
        updatedAt: Date
    },
    history: [{
        status: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
