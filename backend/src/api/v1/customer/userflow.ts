import { Router } from "express";
import { db } from "../../../../db/db";
import { UserRequest } from "../../../types/types";
import { verifyUser } from "../../../middleware/verifyUser";

const userFlowRouter = Router();

userFlowRouter.use(verifyUser);

userFlowRouter.get("/profiles", (req: UserRequest, res) => {
    const pageNo = req.query.page ? Number(req.query.page) : 1;
    const limit = 20;

    const query = `
            WITH distinct_user_ids AS (
            SELECT DISTINCT 
                up_inner.id 
            FROM 
                user_profiles up_inner 
            INNER JOIN 
                media m_inner 
            ON 
                up_inner.user_id = m_inner.user_id 
            WHERE 
                m_inner.type IN (1, 31) 
                AND up_inner.user_id != ?
                AND up_inner.gender = ?
                AND up_inner.want_gender = ?
            ORDER BY 
                up_inner.created_at DESC, 
                up_inner.id DESC 
            LIMIT ? OFFSET ?
        )
        SELECT 
            up.id, 
            up.user_id, 
            up.first_name, 
            up.last_name, 
            up.birthday, 
            m.hash, 
            m.extension, 
            m.type, 
            up.location_id, 
            up.job_id, 
            up.created_at,
            l.country,
            l.continent,
            l.location_string,
            j.name as job
        FROM 
            distinct_user_ids dup
        JOIN 
            user_profiles up 
        ON 
            dup.id = up.id 
        JOIN 
            media m 
        ON 
            up.user_id = m.user_id 
        JOIN 
            locations l
        ON
            up.location_id = l.id
        JOIN
            jobs j
        ON
            j.id = up.job_id
        WHERE 
            m.type IN (1, 31) 
        ORDER BY 
            up.created_at DESC, 
            up.id DESC;
    `;

    db.query(query, [req.userId, req.user.want_gender, req.user.gender, limit, (pageNo - 1) * limit], (err, result) => {
        if (err) {
            res.status(500).send({ message: "Internal server error" });
            return;
        }

        res.status(200).send(result);
    });
});

userFlowRouter.get("/profile/:id", (req: UserRequest, res) => {
    const query = `
        SELECT 
            up.id, 
            up.user_id, 
            up.first_name, 
            up.last_name, 
            up.birthday, 
            up.location_id, 
            up.job_id, 
            up.created_at ,
            l.country,
            l.continent,
            l.location_string,
            j.name as job,
            r.name as religion,
            s.name as study,
            g.name as height,
            wk.name as kids
        FROM user_profiles up 
            INNER JOIN locations l ON l.id = up.location_id 
            INNER JOIN jobs j ON up.job_id = j.id
            INNER JOIN religions r ON r.id = up.religion_id
            INNER JOIN studies s ON s.id = up.study_id
            INNER JOIN growths g ON g.id = up.growth_id
            INNER JOIN want_kids wk ON wk.id = up.want_kid_id  
        WHERE up.user_id = ?;
    `;

    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({ message: "Internal server error" });
            return;
        }

        db.query("SELECT m.id, m.hash, m.extension, m.type FROM media m WHERE m.user_id = ?", [req.params.id], (err, mediaResult) => {
            if (err) {
                console.log(err)
                res.status(500).send({ message: "Internal server error" });
                return;
            }

            result[0].photos = mediaResult;
            res.status(200).send(result[0]);
        });
    });
});

export default userFlowRouter;