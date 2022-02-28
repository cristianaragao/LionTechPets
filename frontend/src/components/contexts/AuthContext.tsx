import React, { createContext, useEffect, useState } from "react";

import { setCookie, parseCookies, destroyCookie } from "nookies";

import SessionService from "../../services/SessionService";

import openSnackBar from "../../components/SnackBar";

import Route from "next/router";

type AuthType = {
    username: string | null;
    login: (data: LoginType) => Promise<boolean | undefined>;
    logout: () => void;
}

type LoginType = {
    username: string;
    password: string
}

const service = SessionService;

const useComponentWillMount = (cb: () => void) => {
    const willMount = React.useRef(true)
  
    if (willMount.current) cb()
  
    willMount.current = false;
  }
  

export const AuthContext = createContext({} as AuthType);

export function AuthProvider({ children }: { children: React.ReactElement<any, any> }) {

    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {

            const { "pets.token": token } = parseCookies();

            if (token) {
                await service.get().then((res) => setUsername(res));
                if (Route.asPath === "/login") await Route.push("/pets");
                await Route.push(Route.asPath);
            }
            else {
                await Route.push("/login");
            }
        }

        load();

    }, []);

    const login = async (data: LoginType) => {
        const {
            token,
            username
        } = await service.login(data).then((re) => re);

        if (!token) return;

        setUsername(username);

        setCookie(undefined, "pets.token", token, {
            maxAge: 60 * 5, // on 5 minutes expires
        });

        return await Route.push("/pets");
    }

    const logout = async () => {
        await Route.push("/login");
        setUsername(null);
        destroyCookie(undefined, "pets.token");
        openSnackBar({ message: "Deslogado", type: "success" });
    }


    return (
        <AuthContext.Provider value={{ login, logout, username }}>
            {children}
        </AuthContext.Provider>
    )
}