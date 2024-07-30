import { RowDataPacket } from "mysql2";
import { db } from "../db/db";
import MailService from "../mail";
import cron from 'node-cron';
import UserApprovalEnum from "./enums/UserApprovalEnum";

const mailService = new MailService();

export async function sendWeeklyMail(userId: number, email: string, gender: number, want_gender: number) {
    const getImageURL = (type: number, hash: string, extension: string, userId: string) => type === 1 ? `https://data.mytamildate.com/storage/public/uploads/user/${userId}/avatar/${hash}-large.${extension}` : `${process.env.API_URL}media/avatar/${hash}.${extension}`;

    try {
        const query = `
            SELECT
                up.user_id,
                CONCAT(up.first_name, ' ', up.last_name) AS name,
                m.type,
                m.hash,
                m.extension
            FROM 
                user_profiles up
            INNER JOIN media m ON up.user_id = m.user_id 
            INNER JOIN users u ON u.id = up.user_id AND u.approval = ${UserApprovalEnum.APPROVED}
            WHERE 
                m.type IN (1, 31) AND m.hash IS NOT NULL
                AND up.user_id != ?
                AND up.gender = ?
                AND up.want_gender = ?
                AND up.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)
                AND u.active = 1
                AND u.deleted_at IS NULL
            ORDER BY 
                up.created_at DESC
            LIMIT 3;
        `;
        const [profiles] = await db.promise().query<RowDataPacket[]>(query, [userId, want_gender, gender]);

        if (profiles.length === 0) {
            return;
        }

        const data = profiles.map(profile => ({
            name: profile.name,
            image: getImageURL(profile.type, profile.hash, profile.extension, profile.user_id),
            link: `${process.env.URL}/user/${profile.name}/${profile.user_id}`
        }));

        await mailService.sendWeeklyMail(email, data);
    } catch (err) {
        console.log('Error sending weekly mail:', err);
    }
}

async function fetchActiveUsers() {
    try {
        const query = `
        SELECT
            u.id,
            up.gender,
            up.want_gender,
            up.email
        FROM 
            users u
            INNER JOIN user_profiles up ON u.id = up.user_id
        WHERE
            u.approval = ${UserApprovalEnum.APPROVED}
            AND u.active = 1
            AND u.deleted_at IS NULL;
        `;

        const [users] = await db.promise().query<RowDataPacket[]>(query);

        return users;
    } catch (err) {
        console.log('Error fetching active users:', err);
    }
}

// Send weekly mail every Sunday at 12:00 AM
cron.schedule('0 0 * * 0', async () => {
    /* const users = await fetchActiveUsers(); */

    const users = [
        {
            id: 73661,
            gender: 1,
            want_gender: 2,
            email: 'vedican.v44@gmail.com',
        },
        {
            id: 73637,
            gender: 1,
            want_gender: 2,
            email: 'niladityasen.2212@gmail.com'
        }
    ];

    if (!users) {
        return;
    }

    for (const user of users) {
        await sendWeeklyMail(user.id, user.email, user.gender, user.want_gender);
    }
});