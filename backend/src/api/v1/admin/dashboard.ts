import { Router } from "express";
import { AdminRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const dashboard = Router();


dashboard.get('/locations/count', (req: AdminRequest, res) => {
    const sql = `
        SELECT 
            country, 
            COUNT(*) as count
        FROM 
            locations
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

//matches have some issue
dashboard.get('/matches/count', (req: AdminRequest, res) => {
    const sql = `SELECT COUNT(*) AS total_rows FROM matches`;

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
    const sql = `
        SELECT 
            g.name AS gender,
            COUNT(up.id) AS count
        FROM 
            user_profiles up
        JOIN 
            genders g ON up.gender = g.id
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
    const sql = `
        SELECT 
            j.name AS job,
            COUNT(up.id) AS count
        FROM 
            user_profiles up
        JOIN 
            jobs j ON up.job_id = j.id
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
        if (results.length === 0) {
            res.status(404).json({ error: 'No users found' });
            return;
        }
        res.status(200).json(results);
    });
});

dashboard.get('/users/count', (req: AdminRequest, res) => {
    const sql = `SELECT COUNT(*) AS total_users FROM users`;

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







export default dashboard;
