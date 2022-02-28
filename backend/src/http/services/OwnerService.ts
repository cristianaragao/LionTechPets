import BaseService from "./";

type OwnerRequest = {
    id?: string;
    name: string;
    phone: string;
}

class OwnerService extends BaseService<OwnerRequest> {}

export default new OwnerService("owners");