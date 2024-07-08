import { Router } from "express";
import { verifyUser } from "../../../middleware/verifyUser";
import { UserRequest } from "../../../types/types";
import { db } from "../../../../db/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import ConversationTypeEnum from "../../../enums/ConversationTypeEnum";
import MessageTypeEnum from "../../../enums/MessageTypeEnum";

const chat = Router();

chat.use(verifyUser);

chat.post("/request", (req: UserRequest, res) => {
    db.beginTransaction(err => {
        if (err) {
            db.rollback((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
            console.log(err);
            res.status(500).send("Failed to begin transaction");
            return;
        }

        db.query<RowDataPacket[]>("SELECT * FROM dncm_participants WHERE conversation_id = ?", [req.body.conversationId], (err, result) => {
            if (err) {
                console.log(err);
                db.rollback((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.status(500).send("Failed to check if participant exists");
                return;
            }

            if (result.length > 0 && req.body.conversationId) {
                db.query<ResultSetHeader>("INSERT INTO dncm_messages (type, version, conversation_id, sender_id, `body`, sent_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [MessageTypeEnum.TEXT, 1, req.body.conversationId, req.userId, req.body.message, Date.now(), Date.now(), 0], (err, result) => {
                    if (err) {
                        console.log(err);
                        db.rollback((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.status(500).send("Failed to send message");
                        return;
                    }

                    db.commit(err => {
                        if (err) {
                            console.log(err);
                            db.rollback((err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            res.status(500).send("Failed to commit transaction");
                            return;
                        }

                        res.status(200).json({ message: "Conversation Added" });
                    });
                });
            } else {
                db.query<ResultSetHeader>("INSERT INTO dncm_conversations (type, owner_id, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)", [ConversationTypeEnum.PRIVATE, req.userId, req.userId, Date.now(), Date.now()], (err, result) => {
                    if (err) {
                        console.log(err);
                        db.rollback((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.status(500).send("Failed to create conversation");
                        return;
                    }

                    const conversationId = result.insertId;

                    db.query<ResultSetHeader>(
                        "INSERT INTO dncm_participants (conversation_id, participant_id, joined_at, read_at, muted_at) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)",
                        [
                            conversationId, req.userId, Date.now(), Date.now(), 0,
                            conversationId, req.body.participantId, 0, 0, 0
                        ],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                db.rollback((err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                                res.status(500).send("Failed to add participant");
                                return;
                            }

                            db.query<ResultSetHeader>("INSERT INTO dncm_messages (type, version, conversation_id, sender_id, `body`, sent_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [MessageTypeEnum.TEXT, 1, conversationId, req.userId, req.body.message, Date.now(), Date.now(), 0], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    db.rollback((err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                    res.status(500).send("Failed to send message");
                                    return;
                                }

                                db.commit(err => {
                                    if (err) {
                                        console.log(err);
                                        db.rollback((err) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                        });
                                        res.status(500).send("Failed to commit transaction");
                                        return;
                                    }

                                    res.status(200).json({ message: "Conversation started", conversationId });
                                });
                            });
                        }
                    );
                });
            }
        });
    })
});

/*
    This endpoint first checks whether a conversation exists between the two users. If it does, it returns the conversation id else it creates a new conversation and returns the conversation id.
*/
chat.post("/create-room", (req: UserRequest, res) => {
    const { participantId } = req.body;

    db.beginTransaction(err => {
        if (err) {
            db.rollback((err) => {
                if (err) {
                    console.log(err);
                }
            });
            console.log(err);
            res.status(500).send("Failed to begin transaction");
            return;
        }

        db.query<RowDataPacket[]>("SELECT dc.id as conversation_id FROM dncm_conversations dc INNER JOIN dncm_participants dp ON dp.conversation_id = dc.id WHERE dc.owner_id = ? and dp.participant_id = ?;", [req.userId, participantId], (err, result) => {
            if (err) {
                console.log(err);
                db.rollback((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.status(500).send("Failed to check if conversation exists");
                return;
            }

            if (result.length === 0) {
                db.query<ResultSetHeader>("INSERT INTO dncm_conversations (type, owner_id, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)", [ConversationTypeEnum.PRIVATE, req.userId, req.userId, Date.now(), Date.now()], (err, result) => {
                    if (err) {
                        console.log(err);
                        db.rollback((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.status(500).send("Failed to create conversation");
                        return;
                    }

                    const conversationId = result.insertId;

                    db.query<ResultSetHeader>(
                        "INSERT INTO dncm_participants (conversation_id, participant_id, joined_at, read_at, muted_at) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)",
                        [
                            conversationId, req.userId, Date.now(), Date.now(), 0,
                            conversationId, participantId, 0, 0, 0
                        ],
                        (err) => {
                            if (err) {
                                console.log(err);
                                db.rollback((err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                                res.status(500).send("Failed to add participant");
                                return;
                            }

                            db.commit(err => {
                                if (err) {
                                    console.log(err);
                                    db.rollback((err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                    res.status(500).send("Failed to commit transaction");
                                    return;
                                }

                                res.status(200).json({ conversationId });
                            });
                        }
                    );
                });
            } else {
                db.commit(err => {
                    if (err) {
                        console.log(err);
                        db.rollback((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.status(500).send("Failed to commit transaction");
                        return;
                    }

                    res.status(200).json({ conversationId: result[0].conversation_id });
                });
            }
        });
    })
});

export default chat;