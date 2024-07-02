import { Router } from "express";
import { db } from "../../../../db/db";
import { UserRequest } from "../../../types/types";
import { verifyUser } from "../../../middleware/verifyUser";

const userFlowRouter = Router();

userFlowRouter.use(verifyUser);

/* userFlowRouter.get("/profiles", (req: UserRequest, res) => {
    const wave = req.query.wave ? Number(req.query.wave) : 1;
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
}); */

async function getUserFilters(userId: string) {
    return new Promise((resolve, reject) => {
        db.query("SELECT uf.filter_id, f.* FROM user_filters uf INNER JOIN filters f WHERE uf.filter_id = f.id AND uf.user_id = ?;", [userId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(result[0]);
        });
    });
}

async function getUserPreferences(userId: string) {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT
            COALESCE((SELECT g.name FROM genders g WHERE f.gender_id = g.id), (SELECT g.name FROM genders g WHERE up.want_gender = g.id)) AS gender,
            COALESCE(f.age_from, (FLOOR(DATEDIFF(NOW(), up.birthday) / 365) - 5)) AS age_from,
            COALESCE(f.age_to, (FLOOR(DATEDIFF(NOW(), up.birthday) / 365) + 10)) AS age_to,
            COALESCE((SELECT r.name FROM religions r WHERE f.religion_id = r.id), (SELECT r.name FROM religions r WHERE up.religion_id = r.id)) AS religion,
            COALESCE((SELECT CONCAT(l.location_string, ', ', l.country) FROM locations l WHERE fl.location_id = l.id), (SELECT CONCAT(l.location_string, ', ', l.country) FROM locations l WHERE up.location_id = l.id)) AS location,
            COALESCE((SELECT s.name FROM studies s WHERE f.education_id = s.id), (SELECT s.name FROM studies s WHERE up.study_id = s.id)) AS education,
            COALESCE((SELECT wk.name FROM want_kids wk WHERE f.want_kids_id = wk.id), (SELECT wk.name FROM want_kids wk WHERE up.want_kid_id = wk.id)) AS want_kids,
            COALESCE((SELECT hk.name FROM have_kids hk WHERE f.have_kids_id = hk.id), (SELECT hk.name FROM have_kids hk WHERE up.have_kid_id = hk.id)) AS have_kids,
            COALESCE((SELECT sm.name FROM smokes sm WHERE f.smoking_id = sm.id), (SELECT sm.name FROM smokes sm WHERE up.smoke_id = sm.id)) AS smoking,
            COALESCE((SELECT d.name FROM drinks d WHERE f.drinks_id = d.id), (SELECT d.name FROM drinks d WHERE up.drink_id = d.id)) AS drinking
            FROM user_filters uf
            INNER JOIN filters f ON f.id = uf.filter_id
            INNER JOIN user_profiles up ON up.user_id = uf.user_id
            LEFT JOIN filter_locations fl ON fl.filters_id = uf.filter_id
            WHERE uf.user_id = ?;
        `, [userId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(result[0]);
        });
    });
}

userFlowRouter.get("/profiles", async (req: UserRequest, res) => {
    const wave = req.query.wave ? Number(req.query.wave) : 1;
    const pageNo = req.query.page ? Number(req.query.page) : 1;
    const limit = 20;

    if (!req.userId) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    let query = "";
    let params = [] as any[];

    const currentUserFilters = await getUserFilters(req.userId);

    if (currentUserFilters) {
        // preferences on flow

        query = `
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
                    AND DATEDIFF(NOW(), up_inner.birthday) BETWEEN (DATEDIFF(NOW(), ?) - (5 * 365)) AND (DATEDIFF(NOW(), ?) + (10 * 365))
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
            FROM distinct_user_ids dup
            JOIN user_profiles up ON dup.id = up.id 
            JOIN media m ON up.user_id = m.user_id 
            JOIN locations l ON up.location_id = l.id
            JOIN jobs j ON j.id = up.job_id
            WHERE m.type IN (1, 31) 
            ORDER BY up.created_at DESC, up.id DESC;
        `;

        params = [
            req.userId,
            req.user.want_gender,
            req.user.gender,
            req.user.birthday,
            req.user.birthday,
            limit,
            (pageNo - 1) * limit
        ];
    } else {

        //* preferences off flow

        query = `
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
                    AND DATEDIFF(NOW(), up_inner.birthday) BETWEEN (DATEDIFF(NOW(), ?) - (5 * 365)) AND (DATEDIFF(NOW(), ?) + (10 * 365))
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
            FROM distinct_user_ids dup
            JOIN user_profiles up ON dup.id = up.id 
            JOIN media m ON up.user_id = m.user_id 
            JOIN locations l ON up.location_id = l.id
            JOIN jobs j ON j.id = up.job_id
            WHERE m.type IN (1, 31) 
            ORDER BY up.created_at DESC, up.id DESC;
        `;

        params = [
            req.userId,
            req.user.want_gender,
            req.user.gender,
            req.user.birthday,
            req.user.birthday,
            limit,
            (pageNo - 1) * limit
        ];
    }

    db.query(query, params, (err, result) => {
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
            up.created_at,
            l.country,
            l.continent,
            l.location_string,
            j.name as job,
            r.name as religion,
            s.name as study,
            g.name as height,
            wk.name as kids,
            sm.name as smoke,
            dr.name as drink
        FROM user_profiles up 
            INNER JOIN media m ON m.user_id = up.user_id 
            INNER JOIN locations l ON l.id = up.location_id 
            INNER JOIN jobs j ON up.job_id = j.id
            INNER JOIN religions r ON r.id = up.religion_id
            INNER JOIN studies s ON s.id = up.study_id
            INNER JOIN growths g ON g.id = up.growth_id
            INNER JOIN want_kids wk ON wk.id = up.want_kid_id  
            INNER JOIN smokes sm ON sm.id = up.smoke_id
            INNER JOIN drinks dr ON dr.id = up.drink_id  
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

            db.query("SELECT p.name FROM user_personalities as up INNER JOIN personalities as p WHERE up.personality_id = p.id AND up.user_id = ?", [req.params.id], (err, personalityResult) => {

                result[0].personalities = personalityResult.map((personality: { name: string }) => personality.name);
                res.status(200).send(result[0]);
            });

        });
    });
});

userFlowRouter.get("/preferences", async (req: UserRequest, res) => {
    const preferences = await getUserPreferences(req.userId as string);

    res.status(200).send(preferences);
});

userFlowRouter.put("/preferences/save/age", (req: UserRequest, res) => {
    const { age_from, age_to } = req.body;

    console.log(req.body)

    if (!age_from || !age_to) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    db.beginTransaction(async (err) => {
        if (err) {
            res.status(500).send({ message: "Internal server error" });
            return;
        }

        try {
            const userFilters: any = await getUserFilters(req.userId as string);

            let query = `UPDATE filters SET age_from = ?, age_to = ? WHERE id = ?;`;
            let params = [age_from, age_to, userFilters.filter_id];

            if (!userFilters) {
                query = `INSERT INTO filters (age_from, age_to) VALUES (?, ?);`;
                params = [age_from, age_to];
            }

            db.query(query, params, async (err, result) => {
                if (err) {
                    console.log(err)
                    db.rollback(() => {
                        res.status(500).send({ message: "Internal server error" });
                    });
                    return;
                }

                if (!userFilters) {
                    const addFilterIdInUserFiltersQuery = `INSERT INTO user_filters (user_id, filter_id) VALUES (?, ?);`;
                    try {
                        await new Promise((resolve, reject) => {
                            db.query(addFilterIdInUserFiltersQuery, [req.userId, result.insertId], (err, result) => {
                                if (err) {
                                    console.log(err)
                                    reject(err);
                                    return;
                                }

                                resolve(result);
                            });
                        });
                    } catch (err) {
                        db.rollback(() => {
                            res.status(500).send({ message: "Internal server error" });
                        });
                        return;
                    }
                }

                db.commit((err) => {
                    if (err) {
                        console.log(err)
                        db.rollback(() => {
                            res.status(500).send({ message: "Internal server error" });
                        });
                        return;
                    }

                    res.status(200).send({ message: "Preferences updated" });
                });
            });
        } catch (err) {
            console.log(err)
            db.rollback(() => {
                res.status(500).send({ message: "Internal server error" });
            });
            return;
        }
    });


});

userFlowRouter.put("/preferences/save/location", (req: UserRequest, res) => {
    const locationId = req.body.location;

    if (!locationId) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    db.beginTransaction(async (err) => {
        if (err) {
            res.status(500).send({ message: "Internal server error" });
            return;
        }

        try {
            const userFilters: any = await getUserFilters(req.userId as string);

            let insertedFilter: any;

            if (!userFilters) {
                insertedFilter = await new Promise((resolve, reject) => {
                    db.query(`INSERT INTO filters (location_type) VALUES (?);`, [0], (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(result);
                    });
                });
            }

            const userLocationFilter: any = await new Promise((resolve, reject) => {
                db.query(`SELECT * FROM filter_locations WHERE filter_id = ?;`, [userFilters.filter_id ?? insertedFilter.insertId], (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result[0]);
                });
            });

            let query = `UPDATE filter_locations SET location_id = ? WHERE filter_id = ?;`;
            let params = [locationId, userLocationFilter.filter_id];

            if (!userLocationFilter) {
                query = `INSERT INTO filter_locations (location_id, filter_id) VALUES (?, ?);`;
                params = [locationId, insertedFilter.insertId ?? userFilters.id];
            }

            db.query(query, params, async (err, result) => {
                if (err) {
                    db.rollback(() => {
                        res.status(500).send({ message: "Internal server error" });
                    });
                    return;
                }

                db.commit((err) => {
                    if (err) {
                        db.rollback(() => {
                            res.status(500).send({ message: "Internal server error" });
                        });
                        return;
                    }

                    res.status(200).send({ message: "Preferences updated" });
                });
            });
        } catch (err) {
            db.rollback(() => {
                res.status(500).send({ message: "Internal server error" });
            });
            return;
        }
    });
});

userFlowRouter.put("/preferences/save/:field", (req: UserRequest, res) => {
    const field = req.params.field;
    const value = req.body.value;

    const fields = [
        "gender_id",
        "religion_id",
        "education_id",
        "smoking_id",
        "want_kids_id",
        "have_kids_id",
        "drinks_id",
    ];

    if (!field || !value) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    if (!fields.includes(field)) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    db.beginTransaction(async (err) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
            return;
        }

        try {
            const userFilters: any = await getUserFilters(req.userId as string);

            let query = `UPDATE filters SET ${field} = ? WHERE id = ?;`;
            let params = [value, userFilters.filter_id];

            if (!userFilters) {
                query = `INSERT INTO filters (${field}) VALUES (?);`;
                params = [value];
            }

            db.query(query, params, async (err, result) => {
                if (err) {
                    console.log(err);
                    db.rollback(() => {
                        res.status(500).send({ message: "Internal server error" });
                    });
                    return;
                }

                if (!userFilters) {
                    const addFilterIdInUserFiltersQuery = `INSERT INTO user_filters (user_id, filter_id) VALUES (?, ?);`;
                    try {
                        await new Promise((resolve, reject) => {
                            db.query(addFilterIdInUserFiltersQuery, [req.userId, result.insertId], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                    return;
                                }

                                resolve(result);
                            });
                        });
                    } catch (err) {
                        console.log(err);
                        db.rollback(() => {
                            res.status(500).send({ message: "Internal server error" });
                        });
                        return;
                    }
                }

                db.commit((err) => {
                    if (err) {
                        db.rollback(() => {
                            res.status(500).send({ message: "Internal server error" });
                        });
                        return;
                    }

                    res.status(200).send({ message: "Preferences updated" });
                });
            });
        } catch (err) {
            console.log(err);
            db.rollback(() => {
                res.status(500).send({ message: "Internal server error" });
            });
            return;
        }
    });
});

userFlowRouter.get("/preferences/options/:field", (req: UserRequest, res) => {
    const field = req.params.field;

    const fields = [
        "genders",
        "religions",
        "studies",
        "locations",
        "want_kids",
        "have_kids",
        "smokes",
        "drinks",
    ]

    if (!fields.includes(field)) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    if (field === "locations") {
        db.query("SELECT id, country, location_string FROM locations GROUP BY country, location_string;", (err, result) => {
            if (err) {
                res.status(500).send({ message: "Internal server error" });
                return;
            }

            const locations = result.reduce((acc: any, location: any) => {
                if (!acc[location.country]) {
                    acc[location.country] = [];
                }

                acc[location.country].push(location);

                return acc;
            }, {});

            res.status(200).send(locations);
        });
    } else {
        db.query(`SELECT name, id FROM ${field} GROUP BY name ORDER BY id ASC;`, (err, result) => {
            if (err) {
                res.status(500).send({ message: "Internal server error" });
                return;
            }

            res.status(200).send(result);
        });
    }
});


export default userFlowRouter;