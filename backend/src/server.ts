import "reflect-metadata";
import "./database";
import express from "express";
import cors from "cors";

import { routes } from "./http/routes"

const app = express();

app.use(express.json());

app.use(cors("*"));

app.use(routes); 

app.listen(process.env.PORT, () => console.log(`\u{1F525} Server is running on http://localhost:${process.env.PORT}...`));