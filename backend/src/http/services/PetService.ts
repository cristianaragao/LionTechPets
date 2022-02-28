import { getRepository } from "typeorm";

import BaseService from "./";

type PetRequest = {
    id?: string;
    name: string;
    birthday: Date;
    ownerId: string;
    breedId: string;
}

class PetService extends BaseService<PetRequest> {

    async list(): Promise<PetRequest[] | Error> {

        const repo = getRepository("pets");

        const breeds = await repo
            .find({
                relations: ["owner", "breed"]
            })
            .then((b: PetRequest[]) => b)
            .catch((error: Error) => error);

        if (breeds instanceof Error) return new Error(breeds.message);

        return breeds;

    }

}

export default new PetService("pets");