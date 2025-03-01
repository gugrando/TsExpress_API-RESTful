import {Request, Response} from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response) {
    try {
        const data = req.body;
        const movie = await MovieModel.create(data);
        res.status(201).json(movie);
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
    }
}

export async function getMovies(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findById(id);
        if (!movie) {
            return res.status(404).json({message: "Movie not found!"});
        }
        res.status(200).json(movie);

    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
    }
}

export async function getAllMovies(req: Request, res: Response) {
    try {
        const movies = await MovieModel.find();
        res.status(200).json(movies);
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deleteMovie(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findById(id)
        if (!movie) {
            return res.status(404).json({message: "Movie not found!"});
        }
        await MovieModel.findByIdAndDelete(id);
        res.status(200).json({message: "Movie deleted!"});
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateMovie(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const movie = await MovieModel.findById(id);
        if (!movie) {
            return res.status(404).json({message: "Movie not found!"});
        }
        
        await MovieModel.updateOne({_id: id}, data);
        res.status(200).json(data).json({message: "Movie updated!"});
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({message: "Internal Server Error"});
    }
}