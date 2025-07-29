// mongo-init.js
// This script runs when MongoDB container starts for the first time

db = db.getSiblingDB('mernapp');

// Create collections
db.createCollection('users');
db.createCollection('posts');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.posts.createIndex({ "createdAt": -1 });
db.posts.createIndex({ "author": 1 });

// Insert sample data (optional)
db.users.insertOne({
    username: "admin",
    email: "admin@example.com",
    password: "$2b$10$rBV2HQ/xsvx0.yZsH3c5e.ZeAI5Qo9R3bKq7L8K5FJ6Hq0X9G2Y8i", // hashed "password123"
    role: "admin",
    createdAt: new Date()
});

print('Database initialized successfully!');