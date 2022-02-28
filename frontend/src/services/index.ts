import api from "./api";

import openSnackBar from "../components/SnackBar";
class BaseService<T> {

    route = "";

    constructor(route: string) {
        this.route = route;
    }

    async create(data: T): Promise<boolean> {

        const response = await api().post(this.route, data)
            .then(response =>
                response.data
            )
            .catch(error => error);

        if (response?.message) {

            if (response.message.toLocaleLowerCase().includes("Network Error".toLocaleLowerCase())) openSnackBar({ message: "Servidor desligado", type: "error" });

            else if (response.message.includes("Duplicate")) {
                const string = response.message.split("'");
                openSnackBar({ message: `"${string[1]}" já foi criado`, type: "warning" });
            }

            return false;
        }
        else {

            openSnackBar({ message: "Criado com sucesso", type: "success" });

            return true;
        }

    }

    async update(id: string, data: T): Promise<boolean> {

        const response = await api().put(`${this.route}/${id}`, data)
            .then(response =>
                response.data
            )
            .catch(error => error);

        if (response?.message) {

            if (response.message.toLocaleLowerCase().includes("Network Error".toLocaleLowerCase())) openSnackBar({ message: "Servidor desligado", type: "error" });

            else if (response.message.includes("Duplicate")) {
                const string = response.message.split("'");
                openSnackBar({ message: `"${string[1]}" já foi criado`, type: "warning" });
            }

            return false;
        }
        else {

            openSnackBar({ message: "Atualizado com sucesso", type: "success" });

            return true;
        }

    }

    async delete(id: string): Promise<boolean> {

        const response = await api().delete(`${this.route}/${id}`)
            .then(response =>
                response.data
            )
            .catch(error => error);

        if (response?.message) {

            if (response.message.toLocaleLowerCase().includes("Network Error".toLocaleLowerCase())) openSnackBar({ message: "Servidor desligado", type: "error" });
            if (response.message.toLocaleLowerCase().includes("foreign key".toLocaleLowerCase())) openSnackBar({ message: "Há um pet que possui este item como informação", type: "warning" });

            return false;
        }
        else {

            openSnackBar({ message: "Excluído com sucesso", type: "success" });

            return true;
        }

    }

    async list(): Promise<any> {

        const response = await api().get(this.route)
            .then(response =>
                response.data
            )
            .catch(error => error);

        if (response instanceof Error) {

            if (response.message.toLocaleLowerCase().includes("401".toLocaleLowerCase())) openSnackBar({ message: "Usuário não autenticado! Faça login.", type: "error" });

            return [];
        }

        return response;

    }

}

export default BaseService;