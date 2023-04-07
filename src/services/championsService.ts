import { Champion } from "../interfaces/champion";
import { championDTO } from "../interfaces/championDTO";
import championsRepository from '../repositories/championsRepository'
import habilitiesRepository from "../repositories/habilitiesRepository";

async function findAll(name: string, localization: string, className: string, gender: string, offset: string, limit: string): Promise<Champion[]> {
  const { rows } = await championsRepository.findAll(name, localization, className, gender, 
                                Number(offset) ? Number(offset) * (Number(limit) || 50) : 0, Number(limit) || 50);
  return rows;
}

async function insertChampion(champion: championDTO){
  const { rows: [championId] } = await championsRepository.insertChampion(champion.name, champion.age, champion.localization, champion.class, champion.gender);
  for (const hab of champion.habilities) {
    await habilitiesRepository.insertHabilities(hab.name, hab.description, championId.id);
  }
}

async function findById(id: number){
  const { rows: [champion] } = await championsRepository.findById(id);
  return champion;
}

async function deleteById(id: number){
  await habilitiesRepository.deleteByChampionId(id);
  await championsRepository.deleteById(id);
}

export default { findAll, insertChampion, findById, deleteById }