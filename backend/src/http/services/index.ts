import { getRepository, DeleteResult, Entity, EntitySchema, EntityTarget } from "typeorm";

import Breed from "../../database/entities/Breed"

export default class BaseService<T> {

    entity: string = "";

    constructor(entity: string) {
        this.entity = entity;
    }

    async create<T>(data: T): Promise<T | Error> {

        const repo = getRepository(this.entity);

        const breed = repo.create(data);

        return await repo.save(breed)
            .then((result: T) => result)
            .catch((error: Error) => error);

    }

    async update<T>(id: string, data: T): Promise<T | Error> {

        const repo = getRepository(this.entity);

        const item = await repo.findOne({ id })
            .then((result: T) => result)
            .catch((error: Error) => error);
        
        if (item instanceof Error) return new Error(item.message);

        if (!item) return new Error(`Item não existe em "${this.entity}".`);

        const newItem = Object.assign(item, data);

        const response = await repo.save(newItem)
            .then((result: T) => result)
            .catch((error: Error) => error);

        return response;

    }

    async list(): Promise<T[] | Error> {

        const repo = getRepository(this.entity);

        const breeds = await repo.find().then((b: T[]) => b).catch((error: Error) => error);

        if (breeds instanceof Error) return new Error(breeds.message);

        return breeds;

    }

    async delete(id: string): Promise<DeleteResult | Error> {

        const repo = getRepository(this.entity);

        const item = await repo.findOne({ id })
            .then((result: T) => result)
            .catch((error: Error) => error);
        
        if (!item) return new Error(`Item não existe em "${this.entity}".`);

        if (item instanceof Error) return  new Error(item.message);

        const response = await repo.delete(id)
            .then((result: DeleteResult) => result)
            .catch((error: Error) => error);

        return response;

    }

}