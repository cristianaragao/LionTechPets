import React, { useState, useEffect } from "react";
import { NextPage } from 'next'

import moment from "moment";

import ListDefault from "../components/ListDefault";

import {
    IconButton,
    Box
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import PetService, { PetType } from "../services/PetService";

type PetList = {
    name: string;
    birthday: string;
    owner: string;
    breed: string;
}

const headers = [
    {
        id: "name",
        label: "Nome"
    },
    {
        id: "birthday",
        label: "Aniversário"
    },
    {
        id: "owner",
        label: "Dono"
    },
    {
        id: "breed",
        label: "Raça"
    },
    {
        id: "actions",
        label: "Ações"
    }
];

const Pets: NextPage = () => {

    const [pets, setPets] = useState<any[]>([]);

    const [createOpen, setCreateOpen] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");

    const filter = (a: PetList) => {

        if (a.name.toLowerCase().includes(search.toLowerCase())) return true;
        if (a.owner.includes(search)) return true;
        if (a.breed.includes(search)) return true;
        if (a.birthday.includes(search)) return true;

        return false;
    }

    useEffect(() => {

        const load = async () => {

            const result = await PetService.list();

            const data = result.map((pet: PetType) => {
                return {
                    name: pet.name,
                    birthday: moment(pet.birthday).format("DD/MM"),
                    owner: pet.owner.name,
                    breed: pet.breed.name,
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

            setPets(data);

        }

        load();

    }, []);

    const configList = {
        data: pets,
        headers,
        filter,
        search,
        setSearch,
        title: "Lista de Pets",
        labelAdd: "Adicionar novo Pet"
    }

    return (
        <>
            <ListDefault {...configList} />
        </>
    )
}

export default Pets;
