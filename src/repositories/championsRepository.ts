import { db } from "../config/database";

async function getChampions(name: string, localization: string, className: string, gender: string, offset: number, limit: number){
    return await db.query(`
        SELECT c.name AS name, c.age AS age, c.localization AS localization, c.class AS class, c.gender AS gender, 
        json_agg(json_build_object('name', h.name, 'description', h.description)) AS habilities FROM champions c JOIN habilities h 
        ON h.champion_id = c.id WHERE UPPER(c.name) LIKE CONCAT('%', COALESCE(UPPER($1), ''), '%') AND UPPER(c.localization) LIKE 
        CONCAT('%', COALESCE(UPPER($2), ''), '%') AND UPPER(c.class) LIKE CONCAT('%', COALESCE(UPPER($3), ''), '%') AND UPPER(c.gender) 
        LIKE CONCAT('%', COALESCE(UPPER($4), ''), '%') ORDER BY c.name ASC OFFSET $5 * $6 LIMIT $6
    `, [name, localization, className, gender, offset, limit])
}

export { getChampions }