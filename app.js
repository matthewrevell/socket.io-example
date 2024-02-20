// Import Express and Socket.IO
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express application
const app = express();

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Create a new Socket.IO instance and attach it to the HTTP server
const io = socketIo(server);

// Define a route handler for the default home page
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// Listen for a new connection event from a client
io.on('connection', (socket) => {
    console.log('A user connected');

    // Inside the connection event, listen for messages from the client
    socket.on('message', (msg) => {
        // Log any messages received from the client
        console.log('Message received: ' + msg);
    });

    // Also inside the connection event, listen for the disconnect event
    socket.on('disconnect', () => {
        // Log when a user disconnects
        console.log('A user disconnected');
    });
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);

        // Emit the message back to all connected clients
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the HTTP server on port 3000
server.listen(3000, () => console.log('Server is running on http://localhost:3000'));