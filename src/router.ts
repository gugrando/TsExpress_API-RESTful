import { Router, Response, Request } from "express";
import { createMovie } from "./controller/MovieController";

const router = Router();
export default router.get('/test', (req: Request, res: Response) => {
    res.status(200).send('Test Endpoint is up!');
}).post('/movie', createMovie);