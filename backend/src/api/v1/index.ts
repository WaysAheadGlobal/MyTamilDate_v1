import { json, Router } from "express";
import { io } from "socket.io-client";
import admin from "./admin";
import auth from "./auth/auth";
import customer from "./customer";
import media from "./media";

const v1 = Router();
const PORT = process.env.PORT;


const socket = io(`http://localhost:${PORT}`); // Adjust port if necessary
console.log(`socket url=> http://localhost:${PORT}`);
socket.on('connect', () => {
  console.log('Connected to the client socket');
});

socket.on('welcome', () => {
  console.log("connected"); // Expect 'Welcome to the server!'
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

socket.on('connect_error', (error :Error) => {
    console.error('Connection error:', error.message);
  });

v1.use('/admin', json({ limit: '15mb' }), admin);
v1.use('/user', json({ limit: '15mb' }), auth)
v1.use('/customer', customer)
v1.use('/media', json({ limit: '15mb' }), media);

export default v1;