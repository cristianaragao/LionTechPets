import BaseService from "./";

type BreedRequest = {
    id?: string;
    name: string;
}

class BreedService extends BaseService<BreedRequest> {}

export default new BreedService("breeds");