import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import { Server } from "socket.io";
import { db } from '../db/db';
import MailService from '../mail';
import api from './api';

const mailService = new MailService();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

app.get("/mail", async (req, res) => {
    try {
        await mailService.sendVerificationMail("niladityasen.2212@gmail.com", "123456");
        await mailService.sendReviewMail("niladityasen.2212@gmail.com", "Niladitya Sen");
        await mailService.sendSignUpMail("niladityasen.2212@gmail.com");
        
        res.status(200).send("Mail sent successfully");
    } catch (error) {
        console.log("Error sending mail:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM admin_users', (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Authentication error'));
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
        return next(new Error('Authentication error'));
    }

    socket.handshake.auth.userId = decoded.userId;

    next();
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.handshake.auth.userId);
    socket.join(socket.handshake.auth.userId);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log('user joined room:', roomId);
    });

    socket.on("leave-room", (roomId) => {
        socket.leave(roomId);
        console.log('user left room:', roomId);
    });

    socket.on('send-message', ({ roomId, message, sentAt, type, recepientId }) => {
        const senderId = socket.handshake.auth.userId;

        db.query('INSERT INTO dncm_messages (type, version, conversation_id, sender_id, body, sent_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [type, 1, roomId, senderId, message, sentAt, sentAt, 0], (err, results) => {
            if (err) {
                console.log('Error sending message:', err);
                return;
            }

            socket.emit('fetch-messages', { fetch: true });
            io.to(recepientId).emit('fetch-messages', { fetch: true });
            socket.to(roomId).emit('receive-message', message);
        });

    });
});

httpServer.listen(PORT, () => {
    db.connect((err) => {
        if (err) {
            console.log('Error connecting to DB:', err);
            return;
        }
        console.log('Connected to DB!');
    });
    console.log(`Server is running at http://localhost:${PORT}`);
});
