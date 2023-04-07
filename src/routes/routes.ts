import { Router } from "express";
import championsController from '../controllers/championsController'
import { validacaoSchema } from "../middlewares/schemaMiddleware";
import { championSchema } from "../schemas/championsSchema";

const router: Router = Router()
router.get('/champions', championsController.findAll);
router.post('/champions', validacaoSchema(championSchema), championsController.insertChampion);
router.get('/champions/:id', championsController.findById);
router.delete('/champions/:id', championsController.deleteById)

export { router }