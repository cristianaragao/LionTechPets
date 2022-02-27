import React, { useState, useEffect } from "react";
import { NextPage } from 'next'

import ListDefault from "../components/ListDefault";

import {
    IconButton
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import BreedService, { BreedType } from "../services/BreedService";

type OwnerList = {
    name: string;
}

const headers = [
    {
        id: "name",
        label: "Nome"
    },
    {
        id: "actions",
        label: "Ações",
    }
];

const Owners: NextPage = () => {

    const [list, setList] = useState<OwnerList[]>([]);

    const [search, setSearch] = useState<string>("");

    const filter = (a: OwnerList) => {

        if (a.name.toLowerCase().includes(search.toLowerCase())) return true;

        return false;
    }

    useEffect(() => {

        const load = async () => {

            const result = await BreedService.list();

            const data = result.map((item: BreedType) => {
                return {
                    name: item.name,
                    actions:
                        <>
                            <IconButton color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error">
                                <DeleteIcon />
                            </IconButton>
                        </>
                }
            })

            setList(data);
        }

        load();

    }, []);

    const configList = {
        data: list,
        headers,
        filter,
        search,
        setSearch,
        title: "Lista de Raças",
        labelAdd: "Adicionar nova raça"
    }

    return (
        <ListDefault {...configList}/>
    )
}

export default Owners;
