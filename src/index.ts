import express from 'express';
import cors from 'cors';
import { router } from './routes/routes';

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

server.listen(5000, () => {
    console.log("SERVER IS FUN IN PÒRT 5000!");
});