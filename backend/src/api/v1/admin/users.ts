import { Router, Request, Response } from "express";
import { AdminRequest } from "../../../types/types";
import axios from 'axios';
import { db } from "../../../../db/db";
import { RowDataPacket } from "mysql2";
import ejs from 'ejs';
import sgMail from '@sendgrid/mail';
const users = Router();

// Define types for callback function
type QueryCallback = (err: Error | null, results: any) => void;






// Helper function to get total count of records
const getTotalCount = (sql: string, values: any[], callback: (err: Error | null, total: number) => void): void => {
    db.query<RowDataPacket[]>(sql, values, (err, results) => {
        if (err) {
            console.error('Error fetching total count:', err);
            callback(err, 0);
        } else {
            callback(null, results[0].total);
        }
    });
};

interface MediaItem {
    id: number;
    hash: string;
    extension: string;
    type: number;
}

users.get('/media/:user_id', (req: AdminRequest, res: Response) => {
    const userId = req.params.user_id;

    const query = 'SELECT id, hash, extension, type FROM media WHERE user_id = ?';

    db.query<RowDataPacket[]>(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching media:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json(results);
    });
});


// Fetch customer data with pagination
users.get('/customers', (req: AdminRequest, res: Response) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const countSql = `
        SELECT COUNT(*) AS total
        FROM user_profiles up
    `;

    const dataSql = `
        SELECT 
            up.first_name, 
            us.approval,
            us.deleted_at,
            up.email, 
            up.phone, 
            loc.country, 
            up.created_at, 
            up.gender, 
            up.birthday,
            uso.is_active,
            up.user_id
        FROM 
            user_profiles up
        LEFT JOIN 
            user_status_old uso ON up.user_id = uso.id
               LEFT JOIN 
            users us ON up.user_id = us.id
        LEFT JOIN 
            locations loc ON up.location_id = loc.id
        ORDER BY 
            up.created_at DESC
        LIMIT ? OFFSET ?
    `;

    const values = [limitValue, (pageNoValue - 1) * limitValue];
    getTotalCount(countSql, [], (err, totalCount) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        db.query(dataSql, values, (err: Error | null, results: any) => {
            if (err) {
                console.log('Error fetching data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).json({
                total: totalCount,
                results
            });
        });
    });
});


// users.get('/approval', (req: AdminRequest, res: Response) => {
//     const { limit, pageNo } = req.query;
//     const limitValue = limit ? parseInt(limit as string) : 10;
//     const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

//     const countSql = `
//         SELECT COUNT(*) AS total
//         FROM user_profiles up
//         JOIN users uso ON up.user_id = uso.id
//         WHERE 
//             uso.approval = 10 AND uso.deleted_at IS NULL  AND uso.active = 1
//     `;

//     const dataSql = `
//         SELECT 
//             up.first_name, 
//             up.last_name,
//             up.email, 
//             up.phone, 
//             loc.country, 
//             up.created_at, 
//             up.gender, 
//             up.birthday,
//            up.updated_at,
//             up.user_id
//         FROM 
//             user_profiles up
//         JOIN 
//             users uso ON up.user_id = uso.id 
//         LEFT JOIN 
//             locations loc ON up.location_id = loc.id 
//         WHERE 
//             uso.approval = 10 AND uso.deleted_at IS NULL AND uso.active = 1
//         LIMIT ? OFFSET ?
//     `;

//     const values = [limitValue, (pageNoValue - 1) * limitValue];

//     getTotalCount(countSql, [], (err, totalCount) => {
//         if (err) {
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         db.query(dataSql, values, (err: Error | null, results: any) => {
//             if (err) {
//                 console.log('Error fetching data:', err);
//                 res.status(500).send('Internal Server Error');
//                 return;
//             }
//             res.status(200).json({
//                 total: totalCount,
//                 results
//             });
//         });
//     });
// });


// Fetch customer details by user_id

users.get('/customers/:user_id', (req: AdminRequest, res) => {
    const userId = req.params.user_id;

    const sql = `
        SELECT 
            up.id,
            up.user_id,
            up.completed,
            up.first_name,
            up.last_name,
            up.email,
            up.email_verified_at,
            up.phone,
            up.birthday,
            loc.country,
            up.gender,
            up.want_gender,
            st.name as study_name,
            j.name as job_name,
            g.name as growth_name,
            r.name as religion_name,
            wk.name as want_kid_name,
            hk.name as have_kid_name,
            s.name as smoke_name,
            d.name as drink_name,
            up.created_at,
            up.updated_at,
            up.popup_promo_shown_stage,
            uso.status,
            uso.is_active,
            us.approval,
            us.deleted_at,
            GROUP_CONCAT(DISTINCT upers.personality_id) as personalities,
            qa.question_id,
            qa.answer
        FROM 
            user_profiles up
        LEFT JOIN 
            user_status_old uso ON up.user_id = uso.id
        LEFT JOIN 
            users us ON up.user_id = us.id
        LEFT JOIN 
            locations loc ON up.location_id = loc.id
        LEFT JOIN 
            studies st ON up.study_id = st.id
        LEFT JOIN 
            jobs j ON up.job_id = j.id
        LEFT JOIN 
            growths g ON up.growth_id = g.id
        LEFT JOIN 
            religions r ON up.religion_id = r.id
        LEFT JOIN 
            want_kids wk ON up.want_kid_id = wk.id
        LEFT JOIN 
            have_kids hk ON up.have_kid_id = hk.id
        LEFT JOIN 
            smokes s ON up.smoke_id = s.id
        LEFT JOIN 
            drinks d ON up.drink_id = d.id
        LEFT JOIN 
            user_personalities upers ON up.user_id = upers.user_id
        LEFT JOIN 
            question_answers qa ON up.user_id = qa.user_id
        WHERE 
            up.user_id = ?
        GROUP BY 
            up.id, qa.question_id`;

    db.query<RowDataPacket[]>(sql, [userId], (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).json(results);
    });
});



users.get('/approval', (req: AdminRequest, res: Response) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const countSql = `
        SELECT COUNT(*) AS total
        FROM user_profiles up
        JOIN users uso ON up.user_id = uso.id
        WHERE 
            uso.approval = 10 AND uso.deleted_at IS NULL AND uso.active = 1
    `;

    const dataSql = `
        SELECT 
            up.first_name, 
            up.last_name,
            up.email, 
            up.phone, 
            loc.country, 
            up.created_at, 
            up.gender, 
            up.birthday,
            up.updated_at,
            up.user_id
        FROM 
            user_profiles up
        JOIN 
            users uso ON up.user_id = uso.id
        LEFT JOIN 
            locations loc ON up.location_id = loc.id
        WHERE 
            uso.approval = 10 AND uso.deleted_at IS NULL AND uso.active = 1
        ORDER BY 
            up.created_at DESC
        LIMIT ? OFFSET ?
    `;

    const values = [limitValue, (pageNoValue - 1) * limitValue];

    getTotalCount(countSql, [], (err, totalCount) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        db.query(dataSql, values, (err: Error | null, results: any) => {
            if (err) {
                console.log('Error fetching data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).json({
                total: totalCount,
                results
            });
        });
    });
});

users.get('/approval2/:id', (req: AdminRequest, res: Response) => {
    const { id } = req.params;

    const dataSql = `
        SELECT 
            up.first_name, 
            up.last_name,
            up.email, 
            up.phone, 
            loc.country, 
            up.created_at, 
            up.gender, 
            up.birthday,
            up.updated_at,
            up.user_id
        FROM 
            user_profiles up
        JOIN 
            users uso ON up.user_id = uso.id
        LEFT JOIN 
            locations loc ON up.location_id = loc.id
        WHERE 
            uso.approval = 10 AND uso.deleted_at IS NULL AND uso.active = 1 AND up.user_id = ?
    `;

    db.query(dataSql, [id], (err: Error | null, results: any) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        res.status(200).json(results[0]);
    });
});

users.get('/approval/:user_id', (req: AdminRequest, res: Response) => {
    const userId = req.params.user_id;

    const sql = `
        SELECT 
            up.first_name AS Name,
            up.last_name AS Surname,
            up.email AS Email,
            uso.approval AS Approval,
            DATE_FORMAT(up.email_verified_at, '%Y-%m-%d') AS 'Email Verified At',
            up.phone AS Phone,
            DATE_FORMAT(up.birthday, '%Y-%m-%d') AS Birthday,
            loc.country AS Country,
            CASE up.gender 
                WHEN 1 THEN 'Male' 
                WHEN 2 THEN 'Female' 
                ELSE 'Other' 
            END AS Gender,
            CASE up.want_gender 
                WHEN 1 THEN 'Male' 
                WHEN 2 THEN 'Female' 
                ELSE 'Other' 
            END AS 'Preferred Gender',
            st.name AS 'Study Field',
            j.name AS 'Job Title',
            g.name AS 'Height',
            r.name AS Religion,
            wk.name AS 'Want Children',
            hk.name AS 'Have Children',
            s.name AS 'Smoker',
            d.name AS 'Drinker',
            DATE_FORMAT(up.created_at, '%Y-%m-%d') AS 'Profile Created At',
            DATE_FORMAT(up.updated_at, '%Y-%m-%d') AS 'Profile Updated At',
            
            GROUP_CONCAT(DISTINCT p.name) AS 'Personalities'
        FROM 
            user_profiles up
        JOIN 
            users uso ON up.user_id = uso.id
        LEFT JOIN 
            locations loc ON up.location_id = loc.id
        LEFT JOIN 
            studies st ON up.study_id = st.id
        LEFT JOIN 
            jobs j ON up.job_id = j.id
        LEFT JOIN 
            growths g ON up.growth_id = g.id
        LEFT JOIN 
            religions r ON up.religion_id = r.id
        LEFT JOIN 
            want_kids wk ON up.want_kid_id = wk.id
        LEFT JOIN 
            have_kids hk ON up.have_kid_id = hk.id
        LEFT JOIN 
            smokes s ON up.smoke_id = s.id
        LEFT JOIN 
            drinks d ON up.drink_id = d.id
        LEFT JOIN 
            user_personalities upers ON up.user_id = upers.user_id
        LEFT JOIN 
            personalities p ON upers.personality_id = p.id
        WHERE 
            up.user_id = ?
            AND uso.approval = 10 
            AND uso.deleted_at IS NULL 
            AND uso.active = 1
        GROUP BY 
            up.id
    `;

    db.query<RowDataPacket[]>(sql, [userId], (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).json(results[0]);
    });
});

// Add the PUT endpoint to update the status
users.put('/updatestatus', (req: AdminRequest, res: Response) => {
    const { id, approval } = req.body;

    if (!id || !approval) {
        return res.status(400).send('Bad Request: Missing user_id or status');
    }

    const getUserEmailSql = `
        SELECT up.email
        FROM users u
        JOIN user_profiles up ON u.id = up.user_id
        WHERE u.id = ?
    `;

    db.query(getUserEmailSql, [id], (err: Error | null, results: any) => {
        if (err) {
            console.error('Error fetching email:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const email = results[0].email;

        const updateStatusSql = `
            UPDATE users
            SET approval = ?
            WHERE id = ?
        `;

        db.query(updateStatusSql, [approval, id], async (err: Error | null, result: any) => {
            if (err) {
                console.error('Error updating status:', err);
                return res.status(500).send('Internal Server Error');
            }

            let html;
            try {
                html = await ejs.renderFile("mail/templates/approve.ejs", { link: `${process.env.URL}/user/home` });
            } catch (renderError) {
                console.error('Error rendering email template:', renderError);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            // Send verification email
            const msg = {
                to: email,
                from: "mtdteam2024@gmail.com",
                subject: "Approval Notification",
                html: html
            };

            sgMail.send(msg)
                .then(() => {
                    console.log("Approval email sent successfully");
                    return res.status(200).send('Status updated successfully and email sent');
                })
                .catch((error) => {
                    console.error('Error sending email:', error);
                    return res.status(500).send('Internal Server Error');
                });
        });
    });
});


// delete the User
users.put('/deleteuser', (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).send('Bad Request: Missing user_id');
        return;
    }

    const deletedAt = new Date(); // Get the current timestamp

    const updateStatusSql = `
        UPDATE users
        SET deleted_at = ?
        WHERE id = ?
    `;

    db.query(updateStatusSql, [deletedAt, id], (err, result) => {
        if (err) {
            console.log('Error updating status:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).send('Status updated successfully');
    });
});

users.get('/media/:id', (req: AdminRequest, res: Response) => {
    const mediaId = req.params.id;

    const query = 'SELECT * FROM media WHERE id = ?';
    db.query<RowDataPacket[]>(query, [mediaId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Media not found');
            return;
        }

        const media = results[0];
        res.json(media);
    });
});

// Fetch user questions by user_id
users.get('/user/questions/:user_id', (req: AdminRequest, res: Response) => {
    const userId = req.params.user_id;

    const sql = `
        SELECT 
            qa.question_id,
            q.text AS question,
            qa.answer,
            qa.created_at,
            qa.updated_at
        FROM 
            question_answers qa
        JOIN 
            questions q ON qa.question_id = q.id
        WHERE 
            qa.user_id = ?
    `;

    db.query(sql, [userId], (err: Error | null, results: any) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(200).json(results);
    });
});

users.get('/user/questions/:user_id', (req: AdminRequest, res: Response) => {
    const userId = req.params.user_id;

    const sql = `
        SELECT 
            qa.question_id,
            q.text AS question,
            qa.answer,
            qa.created_at,
            qa.updated_at
        FROM 
            question_answers qa
        JOIN 
            questions q ON qa.question_id = q.id
        WHERE 
            qa.user_id = ?
    `;

    db.query(sql, [userId], (err: Error | null, results: any) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(200).json(results);
    });
});

users.get('/approval', (req: AdminRequest, res: Response) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const countSql = `
        SELECT COUNT(*) AS total
        FROM user_profiles up
        JOIN users uso ON up.user_id = uso.id
        WHERE uso.status = 15
    `;

    const dataSql = `
        SELECT 
            up.first_name, 
            uso.approval, 
            up.email, 
            up.phone, 
            loc.country, 
            up.created_at, 
            up.gender, 
            up.birthday,
            uso.is_active,
            up.user_id
        FROM 
            user_profiles up
        JOIN 
            users uso ON up.user_id = uso.id
        LEFT JOIN 
            locations loc ON up.location_id = loc.id
            WHERE uso.status = 15
        LIMIT ? OFFSET ?
    `;

    const values = [limitValue, (pageNoValue - 1) * limitValue];

    getTotalCount(countSql, [], (err, totalCount) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        db.query(dataSql, values, (err: Error | null, results: any) => {
            if (err) {
                console.log('Error fetching data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).json({
                total: totalCount,
                results
            });
        });
    });
});

// Fetch payment status with pagination
users.get('/paymentstatus', (req: AdminRequest, res: Response) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const countSql = `
        SELECT COUNT(*) AS total
        FROM users
    `;

    const dataSql = `
        SELECT 
            *
        FROM 
            users
        LIMIT ? OFFSET ?
    `;

    const values = [limitValue, (pageNoValue - 1) * limitValue];

    getTotalCount(countSql, [], (err, totalCount) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        db.query(dataSql, values, (err: Error | null, results: any) => {
            if (err) {
                console.log('Error fetching data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).json({
                total: totalCount,
                results
            });
        });
    });
});

// Alias route for payment status with pagination
users.get('/paymentstatu', (req: AdminRequest, res: Response) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const countSql = `
        SELECT COUNT(*) AS total
        FROM media
        
    `;

    const dataSql = `
        SELECT 
            *
        FROM 
            media
        LIMIT ? OFFSET ?
    `;

    const values = [limitValue, (pageNoValue - 1) * limitValue];

    getTotalCount(countSql, [], (err, totalCount) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        db.query(dataSql, values, (err: Error | null, results: any) => {
            if (err) {
                console.log('Error fetching data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).json({
                total: totalCount,
                results
            });
        });
    });
});


users.get('/paymentstatuu', (req: AdminRequest, res: Response) => {
    const sql = `
        SELECT *
        FROM media
       LIMIT 10
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

users.get('/image/:hash.:extension', async (req: Request, res: Response) => {
    const { hash, extension } = req.params;
    try {
        const response = await axios.get(`https://mytamildate.com/home/${hash}.${extension}`, {
            responseType: 'stream'
        });
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Internal Server Error');
    }
});



export default users;
