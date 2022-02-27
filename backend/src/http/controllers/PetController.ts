import { Request, Response } from "express";
import PetService from "../services/PetService";

class PetController {

    async create(request: Request, response: Response) {
        const {
            name,
            birthday,
            breedId,
            ownerId
        } = request.body;


        const service = new PetService();

        const result = await service.create({
            name,
            birthday,
            breedId,
            ownerId
        })

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(201).json(result);

    }

    async update(request: Request, response: Response) {

        const { id } = request.params;

        const {
            name,
            birthday,
            breedId,
            ownerId
        } = request.body;

        const service = new PetService();

        const result = await service.update({
            id,
            name,
            birthday,
            breedId,
            ownerId
        })

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(200).json(result);

    }

    async list(request: Request, response: Response) {

        const service = new PetService();

        const result = await service.list();

        return response.status(200).json(result);

    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        const service = new PetService();

        const result = await service.delete(id);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(200).json(result);

    }

}

export default new PetController();