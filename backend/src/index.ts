import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT; // Make sure this matches the client's port

const httpServer = createServer(app);
 export const io = new Server(httpServer, {
    cors: {
        origin: '*', // Allow all origins, or specify your client origin
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log('Server is running on', PORT);
});