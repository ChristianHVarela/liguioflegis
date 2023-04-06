import { Request, Response } from "express";
import httpStatus from "http-status";
import championsService from "../services/championsService";

async function getChampions(req: Request, res: Response){
    const { name, localization, className, gender, offset, limit } = req.query;
    try {
        const champions = await championsService.getChampions(name as string, localization as string, className as string, gender as string, offset as string, limit as string);
        return res.status(httpStatus.OK).send(champions);
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export default { getChampions }