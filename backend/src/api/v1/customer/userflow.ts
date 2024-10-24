import { Router } from "express";
import { db } from "../../../../db/db";
import { UserRequest } from "../../../types/types";
import { verifyUser } from "../../../middleware/verifyUser";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import UserApprovalEnum from "../../../enums/UserApprovalEnum";

const userFlowRouter = Router();

userFlowRouter.use(verifyUser);

async function getUserFilters(userId: string) {
  return new Promise((resolve, reject) => {
    db.query<RowDataPacket[]>(
      "SELECT uf.filter_id, f.* FROM user_filters uf INNER JOIN filters f WHERE uf.filter_id = f.id AND uf.user_id = ?;",
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result[0]);
      }
    );
  });
}

async function getUserPreferences(userId: string) {
  return new Promise((resolve, reject) => {
    db.query<RowDataPacket[]>(
      `SELECT
    COALESCE(f.gender_id, up.want_gender) AS gender,
    COALESCE(f.age_from, (FLOOR(DATEDIFF(NOW(), up.birthday) / 365) - 5)) AS age_from,
    COALESCE(f.age_to, (FLOOR(DATEDIFF(NOW(), up.birthday) / 365) + 10)) AS age_to,
    COALESCE(f.religion_id, up.religion_id) AS religion,
    CASE
        WHEN (SELECT location_type FROM filters WHERE id = uf.filter_id) = 1 THEN
            COALESCE((SELECT l.country FROM locations l WHERE fl.location_id = l.id), 
                     (SELECT l.country FROM locations l WHERE up.location_id = l.id), 
                     'North America') -- COUNTRY
        WHEN (SELECT location_type FROM filters WHERE id = uf.filter_id) = 2 THEN
            COALESCE((SELECT CONCAT(l.location_string, IF(l.location_string != '', ', ', ''), l.country) FROM locations l WHERE fl.location_id = l.id),
                     (SELECT CONCAT(l.location_string, IF(l.location_string != '', ', ', ''), l.country) FROM locations l WHERE up.location_id = l.id),
                     'North America') -- CITY
        WHEN (SELECT location_type FROM filters WHERE id = uf.filter_id) = 0 THEN
            'Any' -- ANY
        ELSE
            NULL
    END AS location,
    COALESCE(f.education_id, up.study_id) AS education,
    COALESCE(f.want_kids_id, up.want_kid_id) AS want_kids,
    COALESCE(f.have_kids_id, up.have_kid_id) AS have_kids,
    COALESCE(f.smoking_id, up.smoke_id) AS smoking,
    COALESCE(f.drinks_id, up.drink_id) AS drinking
FROM user_profiles up
LEFT JOIN user_filters uf ON up.user_id = uf.user_id
LEFT JOIN filters f ON f.id = uf.filter_id
LEFT JOIN filter_locations fl ON fl.filters_id = uf.filter_id
WHERE up.user_id = ?;
`,
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result[0]);
      }
    );
  });
}

function getLocationOrder(userLocation: string) {
  switch (userLocation) {
    case "North America":
      return ["North America", "Europe", "Oceania", "Africa", "Asia"];
    case "Europe":
      return ["Europe", "North America", "Oceania", "Africa", "Asia"];
    case "Oceania":
      return ["Oceania", "Europe", "North America", "Africa", "Asia"];
    case "Africa":
      return ["Africa", "Europe", "North America", "Oceania", "Asia"];
    case "Asia":
      return ["Asia", "Oceania", "Europe", "North America", "Africa"];
    default:
      return [];
  }
}

async function deleteAllDiscoverySkip(userId: string) {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM discovery_skip WHERE user_id = ?",
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      }
    );
  });
}

userFlowRouter.get("/email", (req: UserRequest, res) => {
  res.json({ email: req.user.email });
});

// userFlowRouter.get("/profiles", async (req: UserRequest, res) => {
//   console.log("profiles");
//   const wave = req.query.wave ? Number(req.query.wave) : 1;
//   const pageNo = req.query.page ? Number(req.query.page) : 1;
//   const limit = 20;

//   if (!req.userId) {
//     res.status(401).send({ message: "Unauthorized" });
//     return;
//   }

//   if (req.user.active === 0) {
//     res.status(200).json([]);
//     return;
//   }

//   let query = "";
//   let params: any[] = [];

//   const currentUserFilters: any = await getUserFilters(req.userId);
//   console.log("currentUserFilters", currentUserFilters);
//   const userPreferences: any = await getUserPreferences(req.userId);
//   console.log("userPreferences", userPreferences);
//   const user_profiles = await new Promise((resolve, reject) => {
//     db.query<RowDataPacket[]>(
//       `SELECT * FROM user_profiles WHERE user_id = ?;`,
//       [req.userId],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           reject(err);
//           return;
//         }

//         resolve(result[0]);
//       }
//     );
//   });
//   console.log("user_profiles", user_profiles);
//   const userLocationFilter = await new Promise((resolve, reject) => {
//     db.query<RowDataPacket[]>(
//       `SELECT * FROM filter_locations WHERE filters_id = ?;`,
//       [currentUserFilters.filter_id],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           reject(err);
//           return;
//         }

//         resolve(result[0]);
//       }
//     );
//   });
//   console.log("userLocationFilter", userLocationFilter);
//   const userLocation = await new Promise((resolve, reject) => {
//     db.query<RowDataPacket[]>(
//       `SELECT * FROM locations l WHERE id = ?;`,
//       [(userLocationFilter as any).location_id],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           reject(err);
//           return;
//         }

//         resolve(result[0]);
//       }
//     );
//   });
//   console.log("userLocation", userLocation);
//   // Get location preference order (city/country/any)
//   const userLocationPreferenceOrder = getLocationOrder(
//     userPreferences.location
//   );
//   console.log("userLocationPreferenceOrder", userLocationPreferenceOrder);

//   if (currentUserFilters) {
//     let whereClauses = [];
//     let queryParams = [];

//     if (wave === 1) {
//       console.log("first wave");

//       // Age filter
//       if (currentUserFilters.age_from && currentUserFilters.age_to) {
//         whereClauses.push(
//           "FLOOR(DATEDIFF(NOW(), up_inner.birthday) / 365) BETWEEN ? AND ?"
//         );
//         queryParams.push(
//           currentUserFilters.age_from,
//           currentUserFilters.age_to
//         );
//       }

//       if ((user_profiles as any).gender === 1) {
//         // if current user is Male and looking for female
//         if (userPreferences.gender === 2) {
//           whereClauses.push(
//             "(up_inner.gender = 2 AND up_inner.want_gender = 1)"
//           );
//         }
//         // if current user is Male and looking for male
//         else if (userPreferences.gender === 1) {
//           whereClauses.push(
//             "(up_inner.gender = 1 AND up_inner.want_gender = 1)"
//           );
//         }
//         // if current user is Male and looking for both
//         else if (userPreferences.gender === 3) {
//           whereClauses.push(
//             "(up_inner.gender = 1 AND up_inner.want_gender = 3)"
//           );
//           whereClauses.push(
//             "(up_inner.gender = 2 AND up_inner.want_gender = 3)"
//           );
//         }
//       } else if ((user_profiles as any).gender === 2) {
//         // if current user is Female and looking for male
//         if (userPreferences.gender === 1) {
//           whereClauses.push(
//             "(up_inner.gender = 1 AND up_inner.want_gender = 2)"
//           );
//         }
//         // if current user is Female and looking for female
//         else if (userPreferences.gender === 2) {
//           whereClauses.push(
//             "(up_inner.gender = 2 AND up_inner.want_gender = 2)"
//           );
//         }
//         // if current user is Female and looking for both
//         else if (userPreferences.gender === 3) {
//           whereClauses.push(
//             "(up_inner.gender = 1 AND up_inner.want_gender = 3)"
//           );
//           whereClauses.push(
//             "(up_inner.gender = 2 AND up_inner.want_gender = 3)"
//           );
//         }
//       } else if ((user_profiles as any).gender === 3) {
//         // if current user is Non-binary and looking for male
//         if (userPreferences.gender === 1) {
//           whereClauses.push(
//             "(up_inner.gender = 1 AND up_inner.want_gender = 3)"
//           );
//         }
//         // if current user is Non-binary and looking for female
//         else if (userPreferences.gender === 2) {
//           whereClauses.push(
//             "(up_inner.gender = 2 AND up_inner.want_gender = 3)"
//           );
//         }
//         // if current user is Non-binary and looking for both
//         else if (userPreferences.gender === 3) {
//           whereClauses.push(
//             "(up_inner.gender = 1 AND up_inner.want_gender = 3)"
//           );
//           whereClauses.push(
//             "(up_inner.gender = 2 AND up_inner.want_gender = 3)"
//           );
//         }
//       }
//       // Additional filters
//       if (currentUserFilters.religion_id) {
//         whereClauses.push("up_inner.religion_id = ?");
//         queryParams.push(currentUserFilters.religion_id);
//       }
//       if (currentUserFilters.education_id) {
//         whereClauses.push("up_inner.study_id = ?");
//         queryParams.push(currentUserFilters.education_id);
//       }
//       if (currentUserFilters.want_kids_id) {
//         whereClauses.push("up_inner.want_kid_id = ?");
//         queryParams.push(currentUserFilters.want_kids_id);
//       }
//       if (currentUserFilters.have_kids_id) {
//         whereClauses.push("up_inner.have_kid_id = ?");
//         queryParams.push(currentUserFilters.have_kids_id);
//       }
//       if (currentUserFilters.smoking_id) {
//         whereClauses.push("up_inner.smoke_id = ?");
//         queryParams.push(currentUserFilters.smoking_id);
//       }
//       if (currentUserFilters.drinks_id) {
//         whereClauses.push("up_inner.drink_id = ?");
//         queryParams.push(currentUserFilters.drinks_id);
//       }

//       console.log(
//         "currentUserFilters.location_type",
//         currentUserFilters.location_type
//       );

//       // New location-based filtering logic (according to location_type)
//       if (currentUserFilters.location_type == "1") {
//         // COUNTRY only matching
//         whereClauses.push("l_inner.country = ? ");
//         console.log("userLocationcountry", (userLocation as any).country);
//         queryParams.push((userLocation as any).country);
//       } else if (currentUserFilters.location_type == "2") {
//         // CITY and COUNTRY matching
//         whereClauses.push(
//           "l_inner.country = ? AND l_inner.location_string = ?"
//         );
//         queryParams.push((userLocation as any).country);
//         queryParams.push((userLocation as any).location_string);
//       } else {
//         // ANY location (location_type = 0), no location filters applied
//         console.log("Matching without location restrictions");
//       }

//       query = `
//         WITH distinct_user_ids AS (
//     SELECT DISTINCT
//       up_inner.id,
//       l_inner.country,           -- Use 'country' column
//       l_inner.location_string,   -- Assuming 'location_string' stores city-related info
//       up_inner.created_at
//     FROM
//       user_profiles up_inner
//     INNER JOIN locations l_inner ON l_inner.id = up_inner.location_id
//     INNER JOIN users u_inner ON u_inner.id = up_inner.user_id
//     WHERE
//       up_inner.user_id != ?
//       AND u_inner.approval = ${UserApprovalEnum.APPROVED}
//       AND u_inner.active = 1
//       AND u_inner.deleted_at IS NULL
//       ${whereClauses.length > 0 ? " AND " + whereClauses.join(" AND ") : ""}
//       AND up_inner.user_id NOT IN (SELECT ds.person_id FROM discovery_skip ds WHERE ds.user_id = ?)
//     ORDER BY
//       up_inner.created_at DESC,
//       up_inner.id DESC
//     LIMIT ? OFFSET ?
//   )
//   SELECT
//     up.id,
//     up.user_id,
//     up.first_name,
//     up.last_name,
//     up.birthday,
//     m.hash,
//     m.extension,
//     m.type,
//     up.location_id,
//     up.job_id,
//     up.created_at,
//     l.country,                  -- 'country' column
//     l.location_string,          -- Assuming this for 'city'
//     l.continent,
//     j.name as job,
//     (SELECT \`like\` FROM matches ma WHERE ma.person_id = up.user_id AND ma.user_id = ? AND ma.\`like\` = 1 and ma.skip = 0) as \`like\`
//   FROM distinct_user_ids dup
//   JOIN user_profiles up ON dup.id = up.id
//   JOIN media m ON up.user_id = m.user_id
//   JOIN locations l ON up.location_id = l.id
//   JOIN jobs j ON j.id = up.job_id
//   WHERE m.type IN (1, 31)

//       `;

//       params = [
//         req.userId,
//         ...queryParams,
//         req.userId,
//         limit,
//         (pageNo - 1) * limit,
//         req.userId,
//       ];
//     }

//     // Add filters for blocks, reports, etc.
//     query = query.concat(`
//       AND up.user_id NOT IN (SELECT b.person_id FROM blocks b WHERE b.user_id = ?)
//       AND up.user_id NOT IN (SELECT r.person_id FROM reports r WHERE r.user_id = ?)
//       AND up.user_id NOT IN (SELECT b.user_id FROM blocks b WHERE b.person_id = ?)
//       AND up.user_id NOT IN (SELECT r.user_id FROM reports r WHERE r.person_id = ?);
//     `);

//     params.push(req.userId, req.userId, req.userId, req.userId);
//     // Execute query
//     db.query<RowDataPacket[]>(query, params, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send({ message: "Internal server error" });
//         return;
//       }

//       const users = result.filter((user: any) => user.like !== 1);
//       res.status(200).send(users);
//     });
//   }
// });

userFlowRouter.get("/profiles", async (req: UserRequest, res) => {
  console.log("profiles");
  const wave = req.query.wave ? Number(req.query.wave) : 1;
  const pageNo = req.query.page ? Number(req.query.page) : 1;
  const limit = 20;

  if (!req.userId) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (req.user.active === 0) {
    res.status(200).json([]);
    return;
  }

  let query = "";
  let params: any[] = [];

  try {
    const currentUserFilters: any = await getUserFilters(req.userId);
    if (!currentUserFilters) {
      res.status(400).send({ message: "User filters not found." });
      return;
    }
    console.log("currentUserFilters", currentUserFilters);

    const userPreferences: any = await getUserPreferences(req.userId);
    if (!userPreferences) {
      res.status(400).send({ message: "User preferences not found." });
      return;
    }
    console.log("userPreferences", userPreferences);

    const user_profiles = await new Promise((resolve, reject) => {
      db.query<RowDataPacket[]>(
        `SELECT * FROM user_profiles WHERE user_id = ?;`,
        [req.userId],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }

          if (!result.length) {
            reject(new Error("User profile not found"));
            return;
          }
          resolve(result[0]);
        }
      );
    });
    console.log("user_profiles", user_profiles);

    const userLocationFilter = await new Promise((resolve, reject) => {
      db.query<RowDataPacket[]>(
        `SELECT * FROM filter_locations WHERE filters_id = ?;`,
        [currentUserFilters.filter_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }

          if (!result.length) {
            reject(new Error("User location filter not found"));
            return;
          }
          resolve(result[0]);
        }
      );
    });
    console.log("userLocationFilter", userLocationFilter);

    const userLocation = await new Promise((resolve, reject) => {
      db.query<RowDataPacket[]>(
        `SELECT * FROM locations l WHERE id = ?;`,
        [(userLocationFilter as any).location_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }

          if (!result.length) {
            reject(new Error("User location not found"));
            return;
          }
          resolve(result[0]);
        }
      );
    });
    console.log("userLocation", userLocation);

    const userLocationPreferenceOrder = getLocationOrder(
      userPreferences.location
    );
    console.log("userLocationPreferenceOrder", userLocationPreferenceOrder);

    if (currentUserFilters) {
      let whereClauses = [];
      let queryParams = [];

      if (wave === 1) {
        console.log("first wave");

        // Age filter
        if (currentUserFilters.age_from && currentUserFilters.age_to) {
          whereClauses.push(
            "FLOOR(DATEDIFF(NOW(), up_inner.birthday) / 365) BETWEEN ? AND ?"
          );
          queryParams.push(
            currentUserFilters.age_from,
            currentUserFilters.age_to
          );
        }

        // Gender matching logic (based on gender and preferences)
        if ((user_profiles as any).gender === 1) {
          if (userPreferences.gender === 2) {
            whereClauses.push(
              "(up_inner.gender = 2 AND up_inner.want_gender = 1)"
            );
          } else if (userPreferences.gender === 1) {
            whereClauses.push(
              "(up_inner.gender = 1 AND up_inner.want_gender = 1)"
            );
          } else if (userPreferences.gender === 3) {
            whereClauses.push(
              "(up_inner.gender = 1 AND up_inner.want_gender = 3)"
            );
            whereClauses.push(
              "(up_inner.gender = 2 AND up_inner.want_gender = 3)"
            );
          }
        } else if ((user_profiles as any).gender === 2) {
          if (userPreferences.gender === 1) {
            whereClauses.push(
              "(up_inner.gender = 1 AND up_inner.want_gender = 2)"
            );
          } else if (userPreferences.gender === 2) {
            whereClauses.push(
              "(up_inner.gender = 2 AND up_inner.want_gender = 2)"
            );
          } else if (userPreferences.gender === 3) {
            whereClauses.push(
              "(up_inner.gender = 1 AND up_inner.want_gender = 3)"
            );
            whereClauses.push(
              "(up_inner.gender = 2 AND up_inner.want_gender = 3)"
            );
          }
        } else if ((user_profiles as any).gender === 3) {
          if (userPreferences.gender === 1) {
            whereClauses.push(
              "(up_inner.gender = 1 AND up_inner.want_gender = 3)"
            );
          } else if (userPreferences.gender === 2) {
            whereClauses.push(
              "(up_inner.gender = 2 AND up_inner.want_gender = 3)"
            );
          } else if (userPreferences.gender === 3) {
            whereClauses.push(
              "(up_inner.gender = 1 AND up_inner.want_gender = 3)"
            );
            whereClauses.push(
              "(up_inner.gender = 2 AND up_inner.want_gender = 3)"
            );
          }
        }

        // Additional filters (Religion, education, etc.)
        if (currentUserFilters.religion_id) {
          whereClauses.push("up_inner.religion_id = ?");
          queryParams.push(currentUserFilters.religion_id);
        }
        if (currentUserFilters.education_id) {
          whereClauses.push("up_inner.study_id = ?");
          queryParams.push(currentUserFilters.education_id);
        }
        if (currentUserFilters.want_kids_id) {
          whereClauses.push("up_inner.want_kid_id = ?");
          queryParams.push(currentUserFilters.want_kids_id);
        }
        if (currentUserFilters.have_kids_id) {
          whereClauses.push("up_inner.have_kid_id = ?");
          queryParams.push(currentUserFilters.have_kids_id);
        }
        if (currentUserFilters.smoking_id) {
          whereClauses.push("up_inner.smoke_id = ?");
          queryParams.push(currentUserFilters.smoking_id);
        }
        if (currentUserFilters.drinks_id) {
          whereClauses.push("up_inner.drink_id = ?");
          queryParams.push(currentUserFilters.drinks_id);
        }

        // Location-based filtering logic
        if (currentUserFilters.location_type == "1") {
          whereClauses.push("l_inner.country = ?");
          queryParams.push((userLocation as any).country);
        } else if (currentUserFilters.location_type == "2") {
          whereClauses.push(
            "l_inner.country = ? AND l_inner.location_string = ?"
          );
          queryParams.push(
            (userLocation as any).country,
            (userLocation as any).location_string
          );
        }

        query = `
          WITH distinct_user_ids AS (
            SELECT DISTINCT 
              up_inner.id,
              l_inner.country,
              l_inner.location_string,
              up_inner.created_at
            FROM 
              user_profiles up_inner 
            INNER JOIN locations l_inner ON l_inner.id = up_inner.location_id
            INNER JOIN users u_inner ON u_inner.id = up_inner.user_id
            WHERE 
              up_inner.user_id != ? 
              AND u_inner.approval = ${UserApprovalEnum.APPROVED}
              AND u_inner.active = 1
              AND u_inner.deleted_at IS NULL
              ${
                whereClauses.length > 0
                  ? " AND " + whereClauses.join(" AND ")
                  : ""
              }
              AND up_inner.user_id NOT IN (SELECT ds.person_id FROM discovery_skip ds WHERE ds.user_id = ?)
            ORDER BY up_inner.created_at DESC
            LIMIT ? OFFSET ?
          )
          SELECT up.*, l.country, l.location_string
          FROM distinct_user_ids dup
          JOIN user_profiles up ON dup.id = up.id
          JOIN locations l ON up.location_id = l.id
        `;

        params = [
          req.userId,
          ...queryParams,
          req.userId,
          limit,
          (pageNo - 1) * limit,
        ];
      }

      // Additional filters for blocks, reports, etc.
      query = query.concat(`
        AND up.user_id NOT IN (SELECT b.person_id FROM blocks b WHERE b.user_id = ?) 
        AND up.user_id NOT IN (SELECT r.person_id FROM reports r WHERE r.user_id = ?) 
        AND up.user_id NOT IN (SELECT b.user_id FROM blocks b WHERE b.person_id = ?) 
        AND up.user_id NOT IN (SELECT r.user_id FROM reports r WHERE r.person_id = ?);
      `);

      params.push(req.userId, req.userId, req.userId, req.userId);

      // Execute query
      db.query<RowDataPacket[]>(query, params, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "Internal server error" });
          return;
        }

        if (!result.length) {
          res.status(200).send({ message: "No matching profiles found." });
          return;
        }

        const users = result.filter((user: any) => user.id !== req.userId);
        res.json(users);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
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
            dr.name as drink,
            m.hash,
            m.extension,
            m.type,
            (SELECT GROUP_CONCAT(l.name SEPARATOR ', ') FROM user_languages ulang INNER JOIN languages l ON ulang.language_id = l.id WHERE ulang.user_id = 73637) as languages
        FROM user_profiles up 
            LEFT JOIN media m ON m.user_id = up.user_id AND m.type IN (1, 31)
            LEFT JOIN locations l ON l.id = up.location_id 
            LEFT JOIN jobs j ON up.job_id = j.id
            LEFT JOIN religions r ON r.id = up.religion_id
            LEFT JOIN studies s ON s.id = up.study_id
            LEFT JOIN growths g ON g.id = up.growth_id
            LEFT JOIN want_kids wk ON wk.id = up.want_kid_id  
            LEFT JOIN smokes sm ON sm.id = up.smoke_id
            LEFT JOIN drinks dr ON dr.id = up.drink_id  
        WHERE up.user_id = ?;
        `;

  db.query<RowDataPacket[]>(query, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }

    db.query<RowDataPacket[]>(
      "SELECT m.id, m.hash, m.extension, m.type FROM media m WHERE m.user_id = ?",
      [req.params.id],
      (err, mediaResult) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "Internal server error" });
          return;
        }

        if (mediaResult.length !== 0) {
          result[0].photos = mediaResult;
        }

        db.query<RowDataPacket[]>(
          "SELECT p.name FROM user_personalities as up INNER JOIN personalities as p WHERE up.personality_id = p.id AND up.user_id = ?",
          [req.params.id],
          (err, personalityResult) => {
            if (err) {
              console.log(err);
              res.status(500).send({ message: "Internal server error" });
              return;
            }

            if (personalityResult.length !== 0) {
              result[0].personalities = personalityResult.map(
                (personality: any) => personality.name
              );
            }

            db.query<RowDataPacket[]>(
              "SELECT a.id, a.answer, q.text as question FROM question_answers a INNER JOIN questions q ON q.id = a.question_id WHERE user_id = ?;",
              [req.params.id],
              (err, answersResult) => {
                if (err) {
                  console.log(err);
                  res.status(500).send({ message: "Internal server error" });
                  return;
                }

                if (answersResult.length !== 0) {
                  result[0].answers = answersResult;
                }

                res.status(200).send(result[0]);
              }
            );
          }
        );
      }
    );
  });
});

userFlowRouter.get("/preferences", async (req: UserRequest, res) => {
  db.query<RowDataPacket[]>(
    `SELECT
    (SELECT g.name FROM genders g WHERE f.gender_id = g.id) AS gender,
    f.age_from,
    f.age_to,
    (SELECT r.name FROM religions r WHERE f.religion_id = r.id) AS religion,
    CASE
        WHEN (SELECT location_type FROM filters WHERE id = uf.filter_id) = 1 THEN
            (SELECT l.country FROM locations l WHERE fl.location_id = l.id) -- COUNTRY
        WHEN (SELECT location_type FROM filters WHERE id = uf.filter_id) = 2 THEN
            (SELECT CONCAT(l.location_string, IF(l.location_string != '', ', ', ''), l.country) FROM locations l WHERE fl.location_id = l.id) -- CITY
        WHEN (SELECT location_type FROM filters WHERE id = uf.filter_id) = 0 THEN
            'Any' -- ANY
        ELSE
            NULL
    END AS location,
    fl.location_id,
    (SELECT s.name FROM studies s WHERE f.education_id = s.id) AS education,
    (SELECT wk.name FROM want_kids wk WHERE f.want_kids_id = wk.id) AS want_kids,
    (SELECT hk.name FROM have_kids hk WHERE f.have_kids_id = hk.id) AS have_kids,
    (SELECT sm.name FROM smokes sm WHERE f.smoking_id = sm.id) AS smoking,
    (SELECT d.name FROM drinks d WHERE f.drinks_id = d.id) AS drinking,
    (SELECT location_type FROM filters WHERE id = uf.filter_id) AS location_type
FROM user_filters uf
INNER JOIN filters f ON f.id = uf.filter_id
INNER JOIN user_profiles up ON up.user_id = uf.user_id
LEFT JOIN filter_locations fl ON fl.filters_id = uf.filter_id
WHERE uf.user_id = ?;
`,
    [req.userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
        return;
      }

      res.status(200).send(result[0] ?? {});
    }
  );
});

userFlowRouter.put("/preferences/save/age", (req: UserRequest, res) => {
  const { age_from, age_to } = req.body;

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

      let query = "";
      let params: any;

      if (!userFilters) {
        query = `INSERT INTO filters (age_from, age_to) VALUES (?, ?);`;
        params = [age_from, age_to];
      } else {
        query = `UPDATE filters SET age_from = ?, age_to = ? WHERE id = ?;`;
        params = [age_from, age_to, userFilters.filter_id];
      }

      db.query<ResultSetHeader>(query, params, async (err, result) => {
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
              db.query<ResultSetHeader>(
                addFilterIdInUserFiltersQuery,
                [req.userId, result.insertId],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                    return;
                  }

                  resolve(result);
                }
              );
            });
          } catch (err) {
            db.rollback(() => {
              res.status(500).send({ message: "Internal server error" });
            });
            return;
          }
        }

        await deleteAllDiscoverySkip(req.userId as string);

        db.commit((err) => {
          if (err) {
            console.log(err);
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

userFlowRouter.put(
  "/preferences/save/location",
  async (req: UserRequest, res) => {
    const locationId = req.body.location_id;
    const type = req.body.type; // Get type from request body dynamically
    console.log("locationId", locationId);
    console.log("type", type);
    if (typeof locationId === "undefined" || typeof type === "undefined") {
      res.status(400).send({ message: "Bad request" });
      return;
    }

    const isPremium = await new Promise((resolve, reject) => {
      db.query<RowDataPacket[]>(
        "SELECT id FROM subscriptions WHERE user_id = ? AND stripe_status = 'active';",
        [req.userId],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }

          resolve(result.length > 0);
        }
      );
    });

    if (!isPremium) {
      res.status(403).send({ message: "Forbidden" });
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

        let insertedFilter: any;

        if (!userFilters) {
          insertedFilter = await new Promise((resolve, reject) => {
            db.query(
              `INSERT INTO filters (location_type) VALUES (?);`,
              [type], // Insert type dynamically
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject(err);
                  return;
                }

                resolve(result);
              }
            );
          });
        } else {
          // Update the type if filters exist
          await new Promise((resolve, reject) => {
            db.query(
              `UPDATE filters SET location_type = ? WHERE id = ?;`,
              [type, userFilters.filter_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject(err);
                  return;
                }
                resolve(result);
              }
            );
          });
        }

        const userLocationFilter: any = await new Promise((resolve, reject) => {
          db.query<RowDataPacket[]>(
            `SELECT * FROM filter_locations WHERE filters_id = ?;`,
            [userFilters?.filter_id ?? insertedFilter.insertId],
            (err, result) => {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }

              resolve(result[0]);
            }
          );
        });

        let query;
        let params;

        if (type === 0 && !locationId && !userLocationFilter) {
          return;
        }

        // New condition: If type is 0, locationId is null, and userFilters exist, delete from filter_locations
        if (type === 0 && !locationId && userLocationFilter) {
          await new Promise((resolve, reject) => {
            db.query(
              `DELETE FROM filter_locations WHERE filters_id = ?;`,
              [userFilters.filter_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject(err);
                  return;
                }

                resolve(result);
              }
            );
          });

          // Commit the transaction after deletion
          db.commit((err) => {
            if (err) {
              console.log(err);
              db.rollback(() => {
                res.status(500).send({ message: "Internal server error" });
              });
              return;
            }

            res.status(200).send({ message: "Location filter deleted" });
          });

          return; // Exit after deletion
        }

        if (!userLocationFilter) {
          query = `INSERT INTO filter_locations (location_id, filters_id) VALUES (?, ?);`;
          params = [
            locationId,
            insertedFilter?.insertId ?? userFilters.filter_id,
          ];
        } else {
          query = `UPDATE filter_locations SET location_id = ? WHERE filters_id = ?;`;
          params = [locationId, userLocationFilter.filters_id];
        }

        db.query(query, params, async (err, result) => {
          if (err) {
            console.log(err);
            db.rollback(() => {
              res.status(500).send({ message: "Internal server error" });
            });
            return;
          }

          await deleteAllDiscoverySkip(req.userId as string);

          db.commit((err) => {
            if (err) {
              console.log(err);
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
      }
    });
  }
);

userFlowRouter.put(
  "/preferences/save/:field",
  async (req: UserRequest, res) => {
    const field = req.params.field;
    let value = req.body.value;
    console.log("field", field);
    console.log("value", value);
    const fields = [
      "gender_id",
      "religion_id",
      "education_id",
      "smoking_id",
      "want_kids_id",
      "have_kids_id",
      "drinks_id",
    ];

    // if (!field || !value) {
    //     res.status(400).send({ message: "Bad request" });
    //     return;
    // }

    if (!fields.includes(field)) {
      res.status(400).send({ message: "Bad request" });
      return;
    }

    const isPremium = await new Promise((resolve, reject) => {
      db.query<RowDataPacket[]>(
        "SELECT id FROM subscriptions WHERE user_id = ? AND stripe_status = 'active';",
        [req.userId],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }

          if (result.length === 0) {
            resolve(false);
          }

          resolve(true);
        }
      );
    });

    if (field !== "religion_id" && field !== "gender_id" && !isPremium) {
      res.status(403).send({ message: "Forbidden" });
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

        let query = "";
        let params: any;

        if (!userFilters) {
          query = `INSERT INTO filters (${field}) VALUES (?);`;
          params = [value === null ? "3" : value];
        } else {
          query = `UPDATE filters SET ${field} = ? WHERE id = ?;`;
          params = [value === null ? "3" : value, userFilters.filter_id];
        }

        db.query<ResultSetHeader>(query, params, async (err, result) => {
          if (err) {
            console.log(err);
            db.rollback(() => {
              res.status(500).send({ message: "Internal server error" });
            });
            return;
          }

          // Additional step: Update gender in user_profiles if field is gender_id
          if (field === "gender_id") {
            const updateGenderQuery = `
                        UPDATE user_profiles
                        SET want_gender = ?, updated_at = NOW()
                        WHERE user_id = ?
                    `;

            db.query<ResultSetHeader>(
              updateGenderQuery,
              [value == null ? "3" : value, req.userId],
              (err, result) => {
                if (err) {
                  console.log(err);
                  db.rollback(() => {
                    res.status(500).send({ message: "Internal server error" });
                  });
                  return;
                }

                if (result.affectedRows === 0) {
                  db.rollback(() => {
                    res.status(404).json({ message: "User profile not found" });
                  });
                  return;
                }
              }
            );
          }

          if (!userFilters) {
            const addFilterIdInUserFiltersQuery = `INSERT INTO user_filters (user_id, filter_id) VALUES (?, ?);`;
            try {
              await new Promise((resolve, reject) => {
                db.query<ResultSetHeader>(
                  addFilterIdInUserFiltersQuery,
                  [req.userId, result.insertId],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      reject(err);
                      return;
                    }

                    resolve(result);
                  }
                );
              });
            } catch (err) {
              console.log(err);
              db.rollback(() => {
                res.status(500).send({ message: "Internal server error" });
              });
              return;
            }
          }

          await deleteAllDiscoverySkip(req.userId as string);

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
  }
);

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
  ];

  if (!fields.includes(field)) {
    res.status(400).send({ message: "Bad request" });
    return;
  }

  if (field === "locations") {
    db.query<RowDataPacket[]>(
      "SELECT id, country, location_string FROM MTD_UAT.locations GROUP BY id, country, location_string",
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "Internal server error" });
          return;
        }
        console.log(result);
        const locations = result.reduce((acc: any, location: any) => {
          if (!acc[location.country]) {
            acc[location.country] = [];
          }

          acc[location.country].push(location);

          return acc;
        }, {});

        res.status(200).send(locations);
      }
    );
  } else {
    db.query(
      `SELECT name, MIN(id) as id FROM ${field} GROUP BY name ORDER BY id ASC;`,
      (err, result) => {
        if (err) {
          console.error("Error occurred:", err);
          res.status(500).send({
            message: "Internal server error",
            error: err.message,
            stack: err.stack,
          });
          return;
        }
        res.status(200).send(result);
      }
    );
  }
});

export default userFlowRouter;
