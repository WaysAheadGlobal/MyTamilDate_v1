import { Router } from "express";
import { UserRequest } from "../../../types/types";
import { verifyUser } from "../../../middleware/verifyUser";
import { db } from "../../../../db/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { query, validationResult } from "express-validator";

const matches = Router();

matches.use(verifyUser);

matches.get(
    "/",
    query("page").optional().isInt({ min: 1 }),
    (req: UserRequest, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const userId = req.userId;
        const limit = 20;
        const page = req.query.page ? parseInt(req.query.page as string) : 1;

        const query = `
        SELECT
            up.user_id,
            up.first_name,
            me.hash,
            me.type,
            me.extension
        FROM matches m1
            INNER JOIN user_profiles up ON up.user_id = m1.person_id
            INNER JOIN media me ON me.user_id = up.user_id
        WHERE m1.user_id = ?
            AND me.type IN (1, 31)
            AND m1.skip = 0
            AND m1.\`like\` = 1
            AND person_id IN (
                SELECT m2.user_id
                FROM matches m2
                WHERE m2.person_id = m1.user_id
                    AND m2.skip = 0
                    AND m2.\`like\` = 1
            )
        LIMIT ? OFFSET ?;
        `;

        db.query<RowDataPacket[]>(query, [userId, limit, limit * (page - 1)], (err, result) => {
            if (err) {
                res.status(500).send("Failed to get matches");
                return;
            }

            res.status(200).send(result);
        });
    }
);

matches.get(
    "/likes/sent",
    query("page").optional().isInt({ min: 1 }),
    (req: UserRequest, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const userId = req.userId;
        const limit = 20;
        const page = req.query.page ? parseInt(req.query.page as string) : 1;

        const query = `
        SELECT 
            up.user_id,
            up.first_name, 
            up.last_name,
            l.country,
            j.name as job,
            me.hash,
            me.type,
            me.extension
        FROM matches m
            INNER JOIN user_profiles up ON m.person_id = up.user_id
            INNER JOIN locations l ON l.id = up.location_id
            INNER JOIN jobs j ON j.id = up.job_id
            INNER JOIN media me ON me.user_id = up.user_id
        WHERE m.\`like\` = 1 AND m.skip = 0 AND me.type IN (1, 31) AND m.user_id = ?
        LIMIT ? OFFSET ?;
        `;

        db.query<RowDataPacket[]>(query, [userId, limit, limit * (page - 1)], (err, result) => {
            if (err) {
                res.status(500).send("Failed to get likes");
                return;
            }

            res.status(200).send(result);
        });
    }
);

matches.get(
    "/likes/received",
    query("page").optional().isInt({ min: 1 }),
    (req: UserRequest, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const userId = req.userId;
        const limit = 20;
        const page = req.query.page ? parseInt(req.query.page as string) : 1;

        const query = `
        SELECT 
            up.user_id,
            up.first_name, 
            up.last_name,
            l.country,
            j.name as job,
            me.hash,
            me.type,
            me.extension
        FROM matches m
            INNER JOIN user_profiles up ON m.user_id = up.user_id
            INNER JOIN locations l ON l.id = up.location_id
            INNER JOIN jobs j ON j.id = up.job_id
            INNER JOIN media me ON me.user_id = up.user_id
        WHERE m.\`like\` = 1 AND m.skip = 0 AND me.type IN (1, 31) AND m.person_id = ?
        LIMIT ? OFFSET ?;
        `;

        db.query<RowDataPacket[]>(query, [userId, limit, limit * (page - 1)], (err, result) => {
            if (err) {
                res.status(500).send("Failed to get likes");
                return;
            }

            res.status(200).send(result);
        });
    }
);

matches.post("/like", (req: UserRequest, res) => {
    const userId = req.userId;
    const personId = req.body.personId;

    const query = "INSERT INTO matches(user_id, person_id, skip, `like`, created_at, updated_at) VALUES (?, ?, 0, 1, NOW(), NOW()) ON DUPLICATE KEY UPDATE `like` = 0, updated_at = NOW()";

    db.query<ResultSetHeader>(query, [userId, personId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to like person");
            return;
        }

        res.status(200).json({ message: "Person liked" });
    });
});

matches.post("/skip", (req: UserRequest, res) => {
    const userId = req.userId;
    const personId = req.body.personId;

    const query = "INSERT INTO discovery_skip(user_id, person_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())";

    db.query<ResultSetHeader>(query, [userId, personId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to skip person");
            return;
        }

        res.status(200).json({ message: "Person skipped" });
    });
});

matches.post("/undo", (req: UserRequest, res) => {
    const userId = req.userId;

    db.beginTransaction(err => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to undo");
            db.rollback((err) => {
                if (err) {
                    console.log(err);
                }
            });
            return;
        }

        db.query<RowDataPacket[]>("SELECT person_id FROM discovery_skip WHERE user_id = ? ORDER BY created_at DESC LIMIT 1", [userId], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Failed to undo");
                db.rollback((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                return;
            }

            if (result.length === 0) {
                res.status(404).send("No skips found");
                db.rollback((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                return;
            }

            const personId = result[0].person_id;

            db.query<ResultSetHeader>("DELETE FROM discovery_skip WHERE user_id = ? AND person_id = ?", [userId, personId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Failed to undo");
                    db.rollback((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    return;
                }

                db.query<RowDataPacket[]>("SELECT up.id, up.user_id, up.first_name, up.last_name, up.location_id, up.birthday, up.created_at, j.name as job, l.location_string, l.country, m.hash, m.extension, m.type FROM user_profiles up INNER JOIN jobs j ON j.id = up.job_id INNER JOIN locations l ON l.id = up.location_id INNER JOIN media m ON m.user_id = up.user_id WHERE up.user_id = ? AND m.type IN (1, 31)", [personId], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Failed to undo");
                        db.rollback((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        return;
                    }

                    db.commit(err => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Failed to undo");
                            db.rollback((err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            return;
                        }

                        res.status(200).json({ message: "Undo successful", user: result[0] });
                    });
                });
            });
        });
    })
});

matches.get("/chat/received", (req: UserRequest, res) => { });

matches.get("/chat/sent", (req: UserRequest, res) => {
    const query = `
        WITH messages as (
            SELECT DISTINCT conversation_id FROM dncm_messages WHERE sender_id = ?
        ) SELECT 
            m.conversation_id,
            dc.owner_id,
            dp.participant_id,
            dp.joined_at,
            CONCAT(up.first_name, ' ', up.last_name) as name,
            dc.created_at
        FROM messages m
        INNER JOIN dncm_conversations dc ON dc.id = m.conversation_id
        INNER JOIN dncm_participants dp ON dp.conversation_id = m.conversation_id
        INNER JOIN user_profiles up ON up.user_id = dp.participant_id
        WHERE dp.participant_id != ? AND dp.joined_at = 0;
    `;

    const params = [req.userId, req.userId];

    db.query<RowDataPacket[]>(query, params, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to get sent conversations");
            return;
        }

        res.status(200).send(result);
    });
});

matches.get("/chat/received_", (req: UserRequest, res) => {
    console.log("first");

    const query = `
        WITH messages as (
            SELECT DISTINCT conversation_id FROM dncm_messages WHERE sender_id != ?
        ) SELECT 
            m.conversation_id,
            dc.owner_id,
            dp.participant_id,
            dp.joined_at,
            CONCAT(up.first_name, ' ', up.last_name) as name,
            dc.created_at
        FROM messages m
        INNER JOIN dncm_conversations dc ON dc.id = m.conversation_id
        INNER JOIN dncm_participants dp ON dp.conversation_id = m.conversation_id
        INNER JOIN user_profiles up ON up.user_id = dp.participant_id
        WHERE dp.participant_id = ? AND dp.joined_at = 0;
    `;

    const params = [req.userId, req.userId];

    db.query<RowDataPacket[]>(query, params, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to get received conversations");
            return;
        }

        res.status(200).send(result);
    });
});

export default matches;