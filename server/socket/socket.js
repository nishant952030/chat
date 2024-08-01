const express = require("express");
const { Server } = require('socket.io');
const http = require('http');
const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

const onlineUser = new Set();

io.on('connection', async (socket) => {
    console.log('Connected user:', socket.id);

    const token = socket.handshake.auth.token;
    const user = await getUserDetailFromToken(token);
    socket.join(user?._id);
    onlineUser.add(user?._id);

    io.emit('onlineUser', Array.from(onlineUser));

    socket.on('message', (userId) => {
        console.log('User ID from message:', userId);
    });
    socket.on('disconnect', () => {
        console.log('Disconnected user:', socket.id);
        onlineUser.delete(user?._id);
        io.emit('onlineUser', Array.from(onlineUser));
    });
});

module.exports = {
    app, server
};
