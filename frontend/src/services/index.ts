import api from "./api";

import openSnackBar from "../components/SnackBar";

class BaseService<T> {

    route = "";

    constructor(route: string) {
        this.route = route;
    }

    async create(data: T): Promise<T> {

        const response = await api.post(this.route, data);

        return response.data;

    }

    async update(id: string, data: T): Promise<T> {

        const response = await api.put(`${this.route}/${id}`, data);

        return response.data;

    }

    async delete(id: string): Promise<T> {

        const response = await api.put(`${this.route}/${id}`);

        return response.data;

    }

    async list(): Promise<any> {

        const response = await api.get(this.route)
            .then(response =>
                response.data
            )
            .catch(error => error);

        if (response instanceof Error) {
            openSnackBar({ message: "Servidor desligado", type: "error" });
            return [];
        }

        return response;

    }

}

export default BaseService;