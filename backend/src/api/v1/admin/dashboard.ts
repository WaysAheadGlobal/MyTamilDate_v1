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
        LIMIT 10`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

dashboard.get('/matches/count', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `SELECT COUNT(*) AS total_rows FROM matches WHERE ${dateCondition}`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No rows found in the matches table' });
            return;
        }
        const totalRows = results[0].total_rows;
        res.status(200).json({ total_rows: totalRows });
    });
});

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

dashboard.get('/jobs/top-three', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT 
            j.name AS job,
            COUNT(up.id) AS count
        FROM 
            user_profiles up
        JOIN 
            jobs j ON up.job_id = j.id
        WHERE
            ${dateCondition}
        GROUP BY 
            j.name
        ORDER BY 
            count DESC
        LIMIT 3`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No jobs found' });
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

  dashboard.get('/paymentsfirsttime', (req: AdminRequest, res) => {
    const timeRange: string = (req.query.timeRange as string) || '24h';
    const dateCondition = getDateCondition(timeRange);

    const sql = `
        SELECT 
            COUNT(*) as count
        FROM payments p1
        JOIN (
            SELECT user_id, MIN(created_at) as first_payment_date
            FROM payments
            WHERE ${dateCondition}
            GROUP BY user_id
        ) p2
        ON p1.user_id = p2.user_id AND p1.created_at = p2.first_payment_date
        WHERE ${dateCondition}
        ORDER BY p1.created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(results);
    });
});


dashboard.get('/payments/multiple', (req: AdminRequest, res) => {
    const sql = `
        SELECT user_id, COUNT(*) as transaction_count
        FROM payments
        GROUP BY user_id
        HAVING COUNT(*) > 1
        ORDER BY COUNT(*) DESC
        LIMIT 10
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(results);
    });
});

export default dashboard;
