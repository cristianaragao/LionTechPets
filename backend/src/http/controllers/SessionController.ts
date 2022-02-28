import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, DecodeOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

import SessionService from "../services/SessionService";

type UserType = {
    username: string;
    password: string;
}

class SessionController {

    async auth(request: Request, response: Response, next: NextFunction) {
        let token = request.headers["x-access-token"];

        jwt.verify(token, process.env.SECRET_KEY,
            function (error: VerifyErrors, decode: DecodeOptions) {
                if (error) return response.status(401).json({ message: "Usuário não autorizado." });

                request["username"] = decode["username"];

                next();
            }
        )

    }

    async get(request: Request, response: Response) {

        const service = SessionService;

        const result = await service.get({
            username: request["username"]
        })

        if (result instanceof Error) {
            return response.status(200).json({ message: result.message });
        }

        return response.status(201).json(result);

    }


    async signup(request: Request, response: Response) {
        const {
            username,
            password
        }: UserType = request.body;

        const service = SessionService;

        const result = await service.signup({
            username,
            password
        })

        if (result instanceof Error) {
            return response.status(200).json({ message: result.message });
        }

        return response.status(201).json(result);

    }

    async login(request: Request, response: Response) {
        const {
            username,
            password
        }: UserType = request.body;

        const service = SessionService;

        const result = await service.login(username);

        if (result instanceof Error) {
            return response.status(401).json({ message: result.message });
        }

        const isEqual = bcrypt.compareSync(password, result.password);

        if (!isEqual) return response.status(401).json({ message: "Username e/ou senhas incorretas" });

        const token = jwt.sign({ username }, process.env.SECRET_KEY || "", { expiresIn: 300 });

        const res = {
            username,
            token
        }

        return response.status(200).json(res);
    }


}

export default new SessionController();