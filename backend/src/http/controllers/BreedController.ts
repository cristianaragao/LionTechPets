import { Request, Response } from "express";

import BreedService from "../services/BreedService";

class BreedController {

    service = BreedService;

    async create(request: Request, response: Response) {
        const {
            name
        } = request.body;

        const service = BreedService;

        const result = await service.create({
            name
        })

        if (result instanceof Error) {
            return response.status(200).json({ message: result.message });
        }

        return response.status(201).json(result);

    }

    async update(request: Request, response: Response) {

        const { id } = request.params;

        const {
            name
        } = request.body;

        const service = BreedService;

        const result = await service.update(
            id,
            {
                name
            }
        )

        if (result instanceof Error) {
            return response.status(200).json({ message: result.message });
        }

        return response.status(200).json(result);

    }

    async list(request: Request, response: Response) {

        const service = BreedService;

        const result = await service.list();

        return response.status(200).json(result);

    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        const service = BreedService;

        const result = await service.delete(id);

        if (result instanceof Error) {
            return response.status(200).json({ message: result.message });
        }

        return response.status(200).json(result);

    }

}

export default new BreedController();