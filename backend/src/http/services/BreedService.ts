import { getRepository, DeleteResult } from "typeorm";

import Breed from "../../database/entities/Breed"

type BreedRequest = {
    id?: string;
    name: string;
}

export default class BreedService {

    async create(data: BreedRequest): Promise<Breed | Error> {

        const repo = getRepository(Breed);

        try {
            const breed = repo.create(data);

            await repo.save(breed);

            return breed;
        }
        catch {
            return new Error("Error creating Breed")
        }

    }

    async update(data: BreedRequest): Promise<Breed | Error> {

        const repo = getRepository(Breed);

        const { id } = data;

        const breed = await repo.findOne({ id })

        if (!breed) return new Error("Breed not exists")

        try {

            breed.name = data.name;

            await repo.save(breed);

            return breed;
        }
        catch {
            return new Error("Error uptading Breed")
        }

    }

    async list(): Promise<Breed[]> {

        const repo = getRepository(Breed);

        const breeds = repo.find();

        return breeds;

    }

    async delete(id: string): Promise<DeleteResult | Error> {

        const repo = getRepository(Breed);

        if (!(await repo.findOne({ id })))
            return new Error("Breed not exists")

        try {
            const breed = repo.delete(id);

            return breed;
        }
        catch {
            return new Error("Error deleting Breed");
        }

    }

}