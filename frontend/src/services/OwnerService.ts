import BaseService from "./";

export type OwnerType = {
    id: string;
    name: string;
    phone?: string;
    created_at: Date;
    updated_at: Date;
}

class OwnerService extends BaseService<OwnerType> {};

export default new OwnerService("/owners");