import React, { useState, useEffect } from "react";
import { NextPage } from 'next'

import ListDefault from "../components/ListDefault";

import {
    IconButton
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import OwnerService, { OwnerType } from "../services/OwnerService";

type OwnerList = {
    name: string;
    phone: string;
}

const headers = [
    {
        id: "name",
        label: "Nome"
    },
    {
        id: "phone",
        label: "Telefone"
    },
    {
        id: "actions",
        label: "Ações"
    }
];

const Owners: NextPage = () => {

    const [list, setList] = useState<any[]>([]);

    const [search, setSearch] = useState<string>("");

    const filter = (a: OwnerList) => {

        if (a.name.toLowerCase().includes(search.toLowerCase())) return true;
        if (a.phone.includes(search)) return true;

        return false;
    }

    useEffect(() => {

        const load = async () => {

            const result = await OwnerService.list();

            const data = result.map((item: OwnerType) => {
                return {
                    name: item.name,
                    phone: item?.phone ? item.phone : "Não informado",
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
        title: "Lista de Donos",
        labelAdd: "Adicionar novo dono"
    }

    return (
        <ListDefault {...configList}/>
    )
}

export default Owners;
