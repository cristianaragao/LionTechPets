import "reflect-metadata";
import "./database";
import express from "express";
import cors from "cors";

import { createConnection } from "typeorm";

import populate from "./database/populate";

import { routes } from "./http/routes";


createConnection().then(async () => {
    console.log("Connected to the database")
    await populate();
    console.log('Database has been populated')

    const app = express();

    app.use(express.json());

    app.use(cors("*"));

    app.use(routes);

    app.listen(process.env.PORT, () => console.log(`\u{1F525} Server is running on http://localhost:${process.env.PORT}...`));
    
})
.catch(error => console.log(error))

