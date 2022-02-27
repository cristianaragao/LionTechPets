import { getRepository, DeleteResult } from "typeorm";

import Owner from "../../database/entities/Owner"

type OwnerRequest = {
    id?: string;
    name: string;
    phone?: string;
}

export default class PetService {

    async create(data: OwnerRequest): Promise<Owner | Error> {

        const repo = getRepository(Owner);

        try {
            const owner = repo.create(data);

            await repo.save(owner);

            return owner;
        }
        catch {
            return new Error("Error creating Owner")
        }

    }

    async update(data: OwnerRequest): Promise<Owner | Error> {

        const repo = getRepository(Owner);

        const { id } = data;

        const owner = await repo.findOne({ id })

        if (!owner) return new Error("Owner not exists")

        try {
            
            owner.name = data.name;
            owner.phone = data.phone;

            await repo.save(owner);

            return owner;
        }
        catch {
            return new Error("Error uptading Owner")
        }

    }

    async list(): Promise<Owner[]> {

        const repo = getRepository(Owner);

        const owners = repo.find();

        return owners;

    }

    async delete(id: string): Promise<DeleteResult | Error> {

        const repo = getRepository(Owner);

        if (!(await repo.findOne({ id })))
            return new Error("Owner not exists")

        try {
            const owner = repo.delete(id);

            return owner;
        }
        catch {
            return new Error("Error deleting Owner")
        }

    }

}