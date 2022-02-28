import BaseService from "./index";

import { OwnerType } from "./OwnerService";
import { BreedType } from "./BreedService";

export type PetType = {
    id?: string;
    name: string;
    birthday: Date;
    ownerId: string;
    breedId: string;
    owner?: OwnerType;
    breed?: BreedType;
    created_at?: Date;
    updated_at?: Date;
}

class PetService extends BaseService<PetType> {};

export default new PetService("/pets");