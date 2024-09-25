import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import io from "socket.io-client";
import { useCookies } from '../hooks/useCookies';

const SocketContext = createContext(null);

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }

    return context;
}

export default function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const cookies = useCookies();

    useEffect(() => {
        const token = cookies.getCookie('token');

        if (!token) {
            console.warn('No token found, socket will not be initialized.');
            return;
        }

        console.log('Initializing socket connection...');
        const socket = io(process.env.REACT_APP_SOCKET_URL, {
            // auth: {
            //     token
            // },
            path: "/socket"
        });

        // Log when the socket connects
        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        // Log when the socket disconnects
        socket.on('disconnect', (reason) => {
            console.warn('Socket disconnected:', reason);
        });

        // Log any socket errors
        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
        });

        setSocket(socket);

        // Cleanup socket connection when the component unmounts or the pathname changes
        return () => {
            console.log('Disconnecting socket...');
            socket.disconnect();
        };
    }, [cookies, window.location.pathname]);

    const value = useMemo(() => ({ socket }), [socket]);

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}
