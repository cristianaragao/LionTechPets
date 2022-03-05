import api from "./api";

import openSnackBar from "../components/SnackBar";

export type SessionType = {
    username: string;
    password?: string;
}

export type SessionData = {
    username: string | null;
    token: string | null;
}

class SessionService {

    private route = "";

    constructor(route: string) {
        this.route = route;
    }

    async login(data: SessionType): Promise<SessionData> {

        const response = await api().post("/login", data)
            .then(response =>
                response.data
            )
            .catch(error => error);

        if (response?.message) {

            if (response.message.toLocaleLowerCase().includes("Network Error".toLocaleLowerCase())) openSnackBar({ message: "Servidor desligado", type: "error" });

            if (response.message.toLocaleLowerCase().includes("401")) openSnackBar({ message: "Usuário e/ou senhas incorretos", type: "error" });

            return {
                token: null,
                username: null
            };
        }
        else {

            openSnackBar({ message: "Logado", type: "success" });

            return response;
        }
    }

    async signup(data: SessionType): Promise<boolean> {

        const response = await api().post("/signup", data)
            .then(response =>
                response.data
            )
            .catch(error => error);


        if (response?.message) {

            if (response.message.toLocaleLowerCase().includes("Network Error".toLocaleLowerCase())) openSnackBar({ message: "Servidor desligado", type: "error" });

            else openSnackBar({ message: "Este usuário já existe", type: "error" });

            return false;
        }
        else {

            openSnackBar({ message: "Usuário criado com sucesso", type: "success" });

            return true;
        }
    }

    async get(): Promise<string | null> {

        const response = await api().get("/users")
            .then(response =>
                response
            )
            .catch(error => error);

        if (response?.message) {

            if (response.message.toLocaleLowerCase().includes("Network Error".toLocaleLowerCase())) openSnackBar({ message: "Servidor desligado", type: "error" });

            if (response.message.toLocaleLowerCase().includes("401")) openSnackBar({ message: "Usuário não autorizado", type: "error" });

            return null
        }
        else {

            openSnackBar({ message: "Logado", type: "success" });

            return response.username;
        }

    }

};

export default new SessionService("/session");