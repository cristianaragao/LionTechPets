import axios, { Axios } from "axios";

const api: Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}`,
  headers: {
    "Content-type": "application/json"
  }
});

export default api;