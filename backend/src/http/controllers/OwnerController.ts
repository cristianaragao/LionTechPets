import { Request, Response } from "express";
import OwnerService from "../services/OwnerService";

class OwnerController {

    service = OwnerService;

    async create(request: Request, response: Response) {
        const {
            name,
            phone
        } = request.body;

        const service = OwnerService;

        const result = await service.create({
            name,
            phone
        })

        if (result instanceof Error) {
            return response.status(200).json({ message: result.message });
        }

        return response.status(201).json(result);

    }

    async update(request: Request, response: Response) {

        const { id } = request.params;

        const {
            name,
            phone
        } = request.body;

        const service = OwnerService;

        const result = await service.update(
            id,
            {
                name,
                phone
            }
        );

        if (result instanceof Error) {
            return response.status(200).json({ message: result.message });
        }

        return response.status(201).json(result);
    }


    async list(request: Request, response: Response) {

        const service = OwnerService;

        const result = await service.list();

        return response.status(200).json(result);

    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        const service = OwnerService;

        const result = await service.delete(id);

        if (result instanceof Error) {
            return response.status(200).json({ message: result.message });
        }

        return response.status(200).json(result);

    }

}

export default new OwnerController();