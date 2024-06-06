import { Router } from "express";
import { AdminRequest } from "../../../types/types";
import { db } from "../../../../db/db";

const users = Router();

users.get('/customers', (req: AdminRequest, res) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const sql = `
        SELECT 
            up.first_name, 
            uso.status, 
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
            user_status_old uso ON up.user_id = uso.id
        LEFT JOIN 
            locations loc ON up.location_id = loc.id
        LIMIT ? OFFSET ?`;
    const values = [limitValue, (pageNoValue - 1) * limitValue];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});



// Endpoint to get a customer's details by user_id
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
            GROUP_CONCAT(DISTINCT upers.personality_id) as personalities,
            qa.question_id,
            qa.answer
        FROM 
            user_profiles up
        JOIN 
            user_status_old uso ON up.user_id = uso.id
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

    db.query(sql, [userId], (err, results) => {
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

users.get('/user/questions/:user_id', (req: AdminRequest, res) => {
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
            qa.user_id = ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('No questions or answers found for this user');
            return;
        }
        res.status(200).json(results);
    });
});






users.get('/paymentstatus', (req: AdminRequest, res) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const sql = `
        SELECT 
          *
        FROM 
        users
       `;
    const values = [limitValue, (pageNoValue - 1) * limitValue];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

users.get('/paymentstatu', (req: AdminRequest, res) => {
    const { limit, pageNo } = req.query;
    const limitValue = limit ? parseInt(limit as string) : 10;
    const pageNoValue = pageNo ? parseInt(pageNo as string) : 1;

    const sql = `
        SELECT 
          *
        FROM 
        users
       `;
    const values = [limitValue, (pageNoValue - 1) * limitValue];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.log('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).json(results);
    });
});

export default users;
