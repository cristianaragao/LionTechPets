import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

import Route from "next/router";

function API() {

  const loadToken = () => {
    const { "pets.token": token } = parseCookies();
    if (!token) {
      Route.push("/login");
      return "";
    }
    return token;
  }

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}`,
    headers: {
      "Content-type": "application/json",
      "x-access-token": loadToken()
    }
  });

  return api;

};

export default API;