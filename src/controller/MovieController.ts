import {Request, Response} from "express";
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";
import mongoose from "mongoose";

export async function createMovie(req: Request, res: Response) {
    try {
        const data = req.body;
        const movie = await MovieModel.create(data);
        res.status(201).json(movie);
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
    }
}

export async function getMoviesById(req: Request, res: Response) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

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
        // Extrair os parâmetros de página e limite da requisição
        const page = parseInt(req.query.page as string) || 1; // Página atual (default 1)
        const limit = parseInt(req.query.limit as string) || 10; // Limite de filmes por página (default 10)

        // Calcular o número de filmes a ser pulado (skip) com base na página
        const skip = (page - 1) * limit;

        // Buscar filmes com paginação
        const movies = await MovieModel.find()
            .skip(skip)
            .limit(limit);

        // Contar o total de filmes para determinar se há mais páginas
        const totalMovies = await MovieModel.countDocuments();

        // Enviar a resposta com filmes e informações de paginação
        res.status(200).json({
            movies,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalMovies / limit),
                totalMovies,
            },
        });
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
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

        const updatedMovie = await MovieModel.findByIdAndUpdate(id, data, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found!" });
        }

        res.status(200).json({ message: "Movie updated!", movie: updatedMovie });
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createNote(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { note } = req.body; // Pegando apenas a string da nota

        if (!note) {
            return res.status(400).json({ message: "Note is required!" });
        }

        const movie = await MovieModel.findById(id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found!" });
        }

        const newNote = {
            id: new mongoose.Types.ObjectId(),
            note,
        };
        movie.notes.push(newNote);
        await movie.save();

        res.status(201).json({ message: "Note created!", movie });
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
