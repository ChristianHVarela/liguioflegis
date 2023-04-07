import { Router } from "express";
import championsController from '../controllers/championsController'
import { validacaoSchema } from "../middlewares/schemaMiddleware";
import { championSchema } from "../schemas/championsSchema";

const router: Router = Router()
router.get('/champions', championsController.getChampions);
router.post('/champions', validacaoSchema(championSchema), championsController.insertChampion);

export { router }