import BaseService from ".";

export type BreedType = {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

class OwnerService extends BaseService<BreedType> {};

export default new OwnerService("/breeds");