import { db } from "../config/database";

async function findAll(name: string, localization: string, className: string, gender: string, offset: number, limit: number){
    return await db.query(`
        SELECT c.name AS name, c.age AS age, c.localization AS localization, c.class AS class, c.gender AS gender, 
        json_agg(json_build_object('name', h.name, 'description', h.description)) AS habilities FROM champions c JOIN habilities h 
        ON h.champion_id = c.id WHERE UPPER(c.name) LIKE CONCAT('%', COALESCE(UPPER($1), ''), '%') AND UPPER(c.localization) LIKE 
        CONCAT('%', COALESCE(UPPER($2), ''), '%') AND UPPER(c.class) LIKE CONCAT('%', COALESCE(UPPER($3), ''), '%') AND UPPER(c.gender) 
        LIKE CONCAT('%', COALESCE(UPPER($4), ''), '%') GROUP BY c.id, h.id ORDER BY c.name ASC OFFSET $5 LIMIT $6
    `, [name, localization, className, gender, offset, limit])
}

async function insertChampion(name: string, age: number, localization: string, className: string, gender: string){
    return await db.query(`
        INSERT INTO champions (name, age, localization, class, gender)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
    `, [name, age, localization, className, gender])
}

async function findById(id: number){
    return await db.query(`
        SELECT c.name AS name, c.age AS age, c.localization AS localization, c.class AS class, c.gender AS gender, 
        json_agg(json_build_object('name', h.name, 'description', h.description)) AS habilities FROM champions c JOIN habilities h 
        ON h.champion_id = c.id WHERE c.id = $1 GROUP BY c.id
    `, [id])
}

export default { findAll, insertChampion, findById }