import { getRepository } from "typeorm";


export type UserType = {
    username: string;
    password?: string;
}

class UserService {

    entity: string = "";

    constructor(entity: string) {
        this.entity = entity;
    }

    async login(username: string): Promise<UserType | Error> {

        const repo = getRepository(this.entity);

        const item = await repo.findOne({ username })
            .then((result: UserType) => result)
            .catch((error: Error) => error);

        if (item instanceof Error) return new Error(item.message);

        if (!item) return new Error("Username e/ou senhas incorretas");

        return item;
    }

    async logout(): Promise<UserType[] | Error> {

        const repo = getRepository("pets");

        const breeds = await repo
            .find({
                relations: ["owner", "breed"]
            })
            .then((b: UserType[]) => b)
            .catch((error: Error) => error);

        if (breeds instanceof Error) return new Error(breeds.message);

        return breeds;

    }

    async signup(data: UserType): Promise<UserType | Error> {

        const repo = getRepository("users");

        const breed = repo.create(data);

        return await repo.save(breed)
            .then((result: UserType) => result)
            .catch((error: Error) => error);

    }

    async get({ username }: { username: string }): Promise<UserType | Error> {

        const repo = getRepository("users");

        const item = await repo.findOne({ username })
            .then((result: UserType) => result)
            .catch((error: Error) => error);
        ;

        if(item instanceof Error) return item;

        const res: UserType = {
            username: item.username,
        }

        return res;

    }

}

export default new UserService("users");