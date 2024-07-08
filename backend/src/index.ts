import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { db } from '../db/db';
import api from './api';
import { Sendmail } from './sendgrip/mail';
import { createServer } from 'http';
import { Server } from "socket.io";


const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);
app.use('/sendmail', Sendmail)

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

const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log('user joined room:', roomId);
    });

    socket.on('send-message', ({ roomId, message }) => {
        socket.to(roomId).emit('receive-message', message);
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
