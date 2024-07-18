import { RowDataPacket } from "mysql2";
import { db } from "../../db/db";

export const checkPremium = async (userId: string) => {
    const [result] = await db.promise().query<RowDataPacket[]>("SELECT id FROM subscriptions WHERE user_id = ? AND stripe_status = 'active';", [userId]);

    return result.length > 0;
}