import { db } from "../config/database"


async function insertHabilities(name: string, description: string, champion_id: number){
    await db.query(`
        INSERT INTO habilities (name, description, champion_id)
        VALUES ($1, $2, $3)
    `, [name, description, champion_id])
}

async function deleteByChampionId(id: number){
    await db.query(`
        DELETE FROM habilities WHERE champion_id = $1
    `, [id])
}

export default { insertHabilities, deleteByChampionId }