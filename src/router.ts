import { Router, Response, Request } from "express";
import { createMovie, deleteMovie, getAllMovies, getMoviesById, updateMovie } from "./controller/MovieController";
import { validate } from "./middleware/handleValidationMiddleware";
import { movieCreationValidation } from "./middleware/movieValidation";

const router = Router();
export default router.
get('/test', (req: Request, res: Response) => { res.status(200).send('Test Endpoint is up!');})
.post('/movie', movieCreationValidation(), validate,  createMovie)
.get('/movie/:id', getMoviesById)
.get('/movie', getAllMovies)
.delete('/movie/:id', deleteMovie)
.patch('/movie/:id', movieCreationValidation(), validate, updateMovie)