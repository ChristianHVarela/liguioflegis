import { Request, Response } from "express";
import httpStatus from "http-status";
import championsService from "../services/championsService";
import { championDTO } from "../interfaces/championDTO";

async function findAll(req: Request, res: Response){
    const { name, localization, className, gender, offset, limit } = req.query;
    try {
        const champions = await championsService.findAll(name as string, localization as string, className as string, gender as string, offset as string, limit as string);
        return res.status(httpStatus.OK).send(champions);
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

async function insertChampion(req: Request, res: Response){
    const champion: championDTO = req.body;
    try {
        await championsService.insertChampion(champion);
        return res.status(httpStatus.CREATED).send();
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

async function findById(req: Request, res: Response){
    const { id } = req.params;
    try {
        const champion = await championsService.findById(Number(id));
        return res.status(httpStatus.OK).send(champion);
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

async function deleteById(req: Request, res: Response){
    const { id } = req.params;
    try {
        await championsService.deleteById(Number(id));
        return res.status(httpStatus.OK).send();
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export default { findAll, insertChampion, findById, deleteById }