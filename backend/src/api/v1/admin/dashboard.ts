import { Router } from "express";
import { AdminRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const dashboard = Router();

// Helper function to generate date condition
const getDateCondition = (timeRange: string): string => {
    let condition = '';
    switch (timeRange) {
        case '24h':
            condition = "created_at >= NOW() - INTERVAL 1 DAY";
            break;
        case 'week':
            condition = "created_at >= NOW() - INTERVAL 1 WEEK";
            break;
        case 'month':
            condition = "created_at >= NOW() - INTERVAL 1 MONTH";
            break;
        case '3months':
            condition = "created_at >= NOW() - INTERVAL 3 MONTH";
            break;
            case '12months':
                condition = "created_at >= NOW() - INTERVAL 12 MONTH";
                break;
        default:
            condition = "created_at >= NOW() - INTERVAL 1 DAY"; // Default to 24 hours
    }
    return condition;
};

const getDateConditionoflike = (timeRange: string): string => {
    let condition = '';
    switch (timeRange) {
        case '24h':
            condition = "updated_at >= NOW() - INTERVAL 1 DAY";
            break;
        case 'week':
            condition = "updated_at >= NOW() - INTERVAL 1 WEEK";
            break;
        case 'month':
            condition = "updated_at >= NOW() - INTERVAL 1 MONTH";
            break;
        case '3months':
            condition = "updated_at >= NOW() - INTERVAL 3 MONTH";
            break;
            case '12months':
                condition = "updated_at >= NOW() - INTERVAL 12 MONTH";
                break;
        default:
            condition = "updated_at >= NOW() - INTERVAL 1 DAY"; // Default to 24 hours
    }
    return condition;
};

const getDateConditionMessage = (timeRange: string): string => {
    let condition = '';
    switch (timeRange) {
        case '24h':
            condition = "sent_at / 1000 >= UNIX_TIMESTAMP(NOW() - INTERVAL 1 DAY)";
            break;
        case 'week':
            condition = "sent_at / 1000 >= UNIX_TIMESTAMP(NOW() - INTERVAL 1 WEEK)";
            break;
        case 'month':
            condition = "sent_at / 1000 >= UNIX_TIMESTAMP(NOW() - INTERVAL 1 MONTH)";
            break;
        case '3months':
            condition = "sent_at / 1000 >= UNIX_TIMESTAMP(NOW() - INTERVAL 3 MONTH)";
            break;
        case '12months':
            condition = "sent_at / 1000 >= UNIX_TIMESTAMP(NOW() - INTERVAL 12 MONTH)";
            break;
        default:
            condition = "sent_at / 1000 >= UNIX_TIMESTAMP(NOW() - INTERVAL 1 DAY)"; // Default to 24 hours
    }
    return condition;
};

const getDateConditionpayment = (timeRange: string): string => {
    switch (timeRange) {
        case '24h':
            return "INTERVAL 1 DAY";
        case 'week':
            return "INTERVAL 1 WEEK";
        case 'month':
            return "INTERVAL 1 MONTH";
        case '3months':
            return "INTERVAL 3 MONTH";
        case '12months':
            return "INTERVAL 12 MONTH";
        default:
            return "INTERVAL 1 DAY"; // Default to 24 hours
    }
};

const getDateConditionJobs = (timeRange: string): string => {
    let condition = '';
    switch (timeRange) {
        case '24h':
            condition = "up.created_at >= NOW() - INTERVAL 1 DAY";
            break;
        case 'week':
            condition = "up.created_at >= NOW() - INTERVAL 1 WEEK";
            break;
        case 'month':
            condition = "up.created_at >= NOW() - INTERVAL 1 MONTH";
            break;
        case '3months':
            condition = "up.created_at >= NOW() - INTERVAL 3 MONTH";
            break;
        case '12months':
            condition = "up.created_at >= NOW() - INTERVAL 12 MONTH";
            break;
        default:
            condition = "up.created_at >= NOW() - INTERVAL 1 DAY"; // Default to 24 hours
    }
    return condition;
};

dashboard.get('/sessions/avg-time', (req, res) => {
    const timeRange = (req.query.timeRange || '24h').toString();
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT 
            AVG(session_duration) AS avg_session_time
        FROM 
            (SELECT 
                user_id, 
                TIMESTAMPDIFF(SECOND, MIN(created_at), MAX(created_at)) AS session_duration
             FROM audits 
             WHERE ${dateCondition}
             GROUP BY user_id) AS user_sessions;
    `;

    console.log('Executing SQL:', sql);

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No sessions found in the specified time range' });
            return;
        }
        const avgSessionTime = results[0].avg_session_time;
        res.status(200).json({ avg_session_time: avgSessionTime });
    });
});


// Route to get the average time per session
dashboard.get('/sessions/avg-time', (req, res) => {
    const timeRange = (req.query.timeRange || '24h').toString();
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT 
            AVG(TIMESTAMPDIFF(SECOND, MIN(created_at), MAX(created_at))) AS avg_session_time
        FROM 
            (SELECT user_id, created_at 
             FROM audits 
             WHERE ${dateCondition}
             GROUP BY user_id, created_at) AS user_sessions
        GROUP BY user_id;
    `;

    console.log('Executing SQL:', sql);

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No sessions found in the specified time range' });
            return;
        }
        const avgSessionTime = results[0].avg_session_time;
        res.status(200).json({ avg_session_time: avgSessionTime });
    });
});


dashboard.get('/messages/count', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateConditionMessage(timeRange);

    const sql = `SELECT COUNT(*) AS total_messages FROM dncm_messages WHERE ${dateCondition}`;
console.log('Executing SQL:', sql);
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No messages found in the specified time range' });
            return;
        }
        const totalMessages = results[0].total_messages;
        res.status(200).json({ total_messages: totalMessages });
    });
});

dashboard.get('/likes/count', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    console.log('Received timeRange:', timeRange); // Log received timeRange
    const dateCondition = getDateConditionoflike(timeRange);

    // Logging the date condition for debugging purposes
    console.log('Date condition:', dateCondition);

    const sql = `
        SELECT COUNT(*) AS total_likes
        FROM matches
        WHERE \`like\` = 1 AND ${dateCondition}
    `;

    console.log('Executing SQL:', sql);

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const totalLikes = results[0].total_likes;
        console.log('Total likes:', totalLikes);
        res.status(200).json({ total_likes: totalLikes });
    });
});

//API to get total matches
dashboard.get('/matches/count', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateConditionoflike(timeRange);

    const subQuery = `
        SELECT user_id
        FROM matches
        WHERE \`like\` = 1 AND ${dateCondition}
    `;

    const sql = `
        SELECT COUNT(*) AS total_matches
        FROM matches
        WHERE \`like\` = 1 AND person_id IN (${subQuery}) AND ${dateCondition}
    `;
    
    console.log('Executing SQL:', sql);

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No matches found' });
            return;
        }
        const totalMatches = results[0].total_matches;
        res.status(200).json({ total_matches: totalMatches });
    });
});


dashboard.get('/request/count', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateConditionMessage(timeRange);

    const sql = `SELECT COUNT(*) AS total_messages FROM dncm_messages WHERE ${dateCondition}`;
console.log('Executing SQL:', sql);
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No messages found in the specified time range' });
            return;
        }
        const totalMessages = results[0].total_messages;
        res.status(200).json({ total_messages: totalMessages });
    });
});

dashboard.get('/locations/count', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT 
            country, 
            COUNT(*) as count
        FROM 
            locations
        WHERE
            ${dateCondition}
        GROUP BY 
            country
        ORDER BY 
            count DESC
        LIMIT 5`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

// dashboard.get('/matches/count', (req: AdminRequest, res) => {
//     const timeRange: string = (req.query.timeRange as string) || '24h';
//     const dateCondition = getDateCondition(timeRange);

//     const sql = `SELECT COUNT(*) AS total_rows FROM matches WHERE ${dateCondition}`;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching data:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         if (results.length === 0) {
//             res.status(404).json({ error: 'No rows found in the matches table' });
//             return;
//         }
//         const totalRows = results[0].total_rows;
//         res.status(200).json({ total_rows: totalRows });
//     });
// });

dashboard.get('/count-by-gender', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT 
            g.name AS gender,
            COUNT(up.id) AS count
        FROM 
            user_profiles up
        JOIN 
            genders g ON up.gender = g.id
        WHERE
            ${dateCondition}
        GROUP BY 
            g.name`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (!results) {
            console.error('No data returned from the database');
            res.status(500).send('Internal Server Error');
            return;
        }
        const countByGender = results.reduce((acc: { [key: string]: number }, row: { gender: string, count: number }) => {
            acc[row.gender] = row.count;
            return acc;
        }, {});
        res.status(200).json(countByGender);
    });
});


dashboard.get('/top-jobs', (req, res) => {
    const limit = parseInt(req.query.limit as string, 10) || 5; // Default to 5 if not provided
    const timeRange = (req.query.timeRange as string) || '24h'; // Default to 24 hours if not provided
    const dateCondition = getDateConditionJobs(timeRange);

    const sql = `
        SELECT j.name AS job_name, COUNT(up.job_id) AS count
        FROM user_profiles up
        JOIN jobs j ON up.job_id = j.id
        WHERE ${dateCondition}
        AND up.job_id IS NOT NULL
        GROUP BY up.job_id
        ORDER BY count DESC
        LIMIT ?
    `;

    db.query(sql, [limit], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
});
dashboard.get('/users/age-group', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT 
            CASE
                WHEN TIMESTAMPDIFF(YEAR, birthday, CURDATE()) BETWEEN 18 AND 24 THEN '18-24'
                WHEN TIMESTAMPDIFF(YEAR, birthday, CURDATE()) BETWEEN 25 AND 30 THEN '25-30'
                WHEN TIMESTAMPDIFF(YEAR, birthday, CURDATE()) BETWEEN 31 AND 40 THEN '31-40'
                ELSE '41+'
            END AS age_group,
            COUNT(*) AS count
        FROM 
            user_profiles
        WHERE
            TIMESTAMPDIFF(YEAR, birthday, CURDATE()) >= 18
            AND ${dateCondition}
        GROUP BY 
            age_group
        ORDER BY 
            age_group`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(results);
    });
});

dashboard.get('/users/count', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `SELECT COUNT(*) AS total_users FROM users WHERE ${dateCondition}`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No users found' });
            return;
        }
        const totalUsers = results[0].total_users;
        res.status(200).json({ total_users: totalUsers });
    });
});

dashboard.get('/payments', (req: AdminRequest, res) => {
    const sql = `
      SELECT payments.*, user_profiles.first_name
      FROM payments
      JOIN user_profiles ON payments.user_id = user_profiles.user_id
      ORDER BY payments.created_at DESC
      LIMIT 10
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'No transactions found' });
        return;
      }
  
      res.status(200).json(results);
    });
  });
  
  dashboard.get('/payments/count', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
      SELECT COUNT(*) AS total_payments
      FROM payments
      WHERE ${dateCondition}
    `;

    console.log('Executing SQL:', sql);

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'No payments found in the specified time range' });
            return;
        }

        const totalPayments = results[0].total_payments;
        res.status(200).json({ total_payments: totalPayments });
    });
});

  dashboard.get('/payments/total', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateConditionpayment(timeRange);

    const sql = `
        SELECT SUM(amount) AS total_payments
        FROM payments
        WHERE created_at >= DATE_SUB(NOW(), ${dateCondition})
    `;

    console.log('Executing SQL:', sql); // Log the SQL query for debugging

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (!results || results.length === 0 || !results[0].total_payments) {
            res.status(404).json({ error: 'No payments found in the specified time range' });
            return;
        }

        if (!results || results.length === 0 || !results[0].total_payments) {
            res.status(404).json({ error: 'No payments found in the specified time range' });
            return;
        }

        const totalPayments = results[0].total_payments;
        const totalPaymentsCAD = Math.round(totalPayments * 1)/60; 
        res.status(200).json({ total_payments_cad: totalPaymentsCAD });
    });
});


dashboard.get('/renewals/count', (req, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT COUNT(*) AS total_renewals
        FROM payments
        WHERE amount != 0
       
        AND ${dateCondition}
    `;

    db.query(sql,  (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const totalRenewals = results[0].total_renewals;
        res.status(200).json({ total_renewals: totalRenewals });
    });
});

dashboard.get('/new-paid-members/count', (req, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT COUNT(*) AS total_new_paid_members
        FROM users u
        WHERE 
            u.id IN (
                SELECT p.user_id
                FROM payments p
                WHERE ${dateCondition}
            )
            AND u.approval != ?
            AND u.approval != ?
            AND u.deleted_at IS NULL
    `;

    const approvalUnknown = 15; // Replace with the actual value for unknown approval status
    const approvalRegistered = 40; // Replace with the actual value for registered approval status

    // Log the SQL query for debugging
    console.log('Executing SQL:', sql);

    db.query(sql, [approvalUnknown, approvalRegistered], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const totalNewPaidMembers = results[0]?.total_new_paid_members || 0;
        res.status(200).json({ total_new_paid_members: totalNewPaidMembers });
    });
});

dashboard.get('/requests/count', (req, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT COUNT(*) AS total_requests
        FROM request_conversations
        WHERE ${dateCondition}
    `;

    // Log the SQL query for debugging
    console.log('Executing SQL:', sql);

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const totalRequests = results[0]?.total_requests || 0;
        res.status(200).json({ total_requests: totalRequests });
    });
});

dashboard.get('/old-members/signed-in/count', (req, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateConditionoflike(timeRange);

    const sql = `
        SELECT COUNT(*) AS total_old_members_signed_in
        FROM users
        WHERE 
            old_id IS NOT NULL
            AND old_login_at IS NOT NULL
            AND ${dateCondition}
            AND approval != ?
            AND approval != ?
            AND deleted_at IS NULL
    `;

    const approvalUnknown = 15; // Replace with the actual value for unknown approval status
    const approvalRegistered = 40; // Replace with the actual value for registered approval status

    // Log the SQL query for debugging
    console.log('Executing SQL:', sql);
    console.log('Approval unknown:', approvalUnknown);
    console.log('Approval registered:', approvalRegistered);

    db.query(sql, [approvalUnknown, approvalRegistered], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const totalOldMembersSignedIn = results[0]?.total_old_members_signed_in || 0;
        res.status(200).json({ total_old_members_signed_in: totalOldMembersSignedIn });
    });
});



export default dashboard;
