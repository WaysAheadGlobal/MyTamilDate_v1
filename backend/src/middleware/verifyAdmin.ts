import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../db/db";
import { AdminRequest } from "../types/types";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const verifyAdmin = (req: AdminRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: "Internal server error: JWT Secret is not defined" });
    }

    let decoded: any;
    try {
        decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const sql = "SELECT * FROM admin_users WHERE id = ?";
    const values = [decoded.adminId];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.adminId = decoded.adminId;
        next();
    });
};
