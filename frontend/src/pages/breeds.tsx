import React, { useState, useEffect } from "react";
import { NextPage } from 'next'

import ListDefault from "../components/ListDefault";

import {
    IconButton,
    Grid,
    TextField,
    ButtonProps,
    Button,
    Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from "@mui/material/styles";

import BreedService, { BreedType } from "../services/BreedService";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import Modal from "../components/Modal";

const ColorButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#59B09E",
    "&:hover": {
        boxShadow: "1px solid black",
        backgroundColor: "#59B09E",
    },
}));

type BreedList = {
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

const messageRequired: string = "Campo obrigatório.";

const Owners: NextPage = () => {
    const [list, setList] = useState<BreedList[]>([]);
    const [search, setSearch] = useState<string>("");
    const [item, setItem] = useState<BreedType | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const initialValues: BreedList = {
        name: item ? item.name : "",
    };

    const validationSchema: yup.AnyObjectSchema = yup.object().shape({
        name: yup.string().trim().required(messageRequired),
    });

    const openEdit = (item: BreedType) => {
        setItem(item);
        setOpenModal(true);
    }

    const closeEdit = (): void => {
        setItem(null);
        setOpenModal(false);
    }

    const openDelete = (item: BreedType) => {
        setItem(item);
        setOpenDeleteModal(true);
    }

    const closeDelete = () => {
        setOpenDeleteModal(false);
        setItem(null);
    }

    const filter = (a: BreedList) => {

        if (a.name.toLowerCase().includes(search.toLowerCase())) return true;

        return false;
    }

    const load = async () => {

        const result = await BreedService.list();

        const data = result.map((item: BreedType) => {
            return {
                name: item.name,
                actions:
                    <>
                        <IconButton color="primary" onClick={() => openEdit(item)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => openDelete(item)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
            }
        })

        setList(data);
    }

    useEffect(() => {

        load();

    }, []);

    const actionRemove = async() => {

        if(!item?.id) return;

        const submitted: boolean = await BreedService.delete(item.id);

        if(!submitted) return;

        closeDelete();

        await load();

    }

    const ComponentCreateEdit = (
        <Modal
            open={openModal}
            handleOpen={() => setOpenModal(true)}
            handleClose={item ? () => closeEdit() : () => setOpenModal(false)}
            label="Adicionar nova raça"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values: BreedList, helpers) => {
                    const { setSubmitting } = helpers;

                    const data: BreedList = {
                        ...values
                    }

                    const submitted: boolean = item?.id ? await BreedService.update(item.id, data) : await BreedService.create(values);

                    setSubmitting(false);

                    if (!submitted) return;

                    await load();

                    setOpenModal(false);

                    return;
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }: FormikProps<BreedList>) => {

                    return (
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <Typography fontWeight="bold" variant="subtitle1">
                                {item ? "Atualizar" : "Novo"}
                            </Typography>

                            <Grid
                                container
                                spacing={2}
                                style={{
                                    display: "flex",
                                    marginTop: "0rem",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    minWidth: "15rem",
                                }}
                            >
                                <Grid item sm={12} xs={12}>
                                    <TextField
                                        id="name"
                                        label="Nome"
                                        value={values.name}
                                        error={Boolean(errors.name) && Boolean(touched.name)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={
                                            Boolean(errors.name) && Boolean(touched.name)
                                                ? errors.name
                                                : ""
                                        }
                                    />
                                </Grid>

                                <Grid item sm={12} xs={6}>
                                    <Button
                                        variant="contained"
                                        disabled={isSubmitting}
                                        color="error"
                                        style={{ margin: "1rem 0.6rem" }}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        <Typography variant="subtitle2">Cancelar</Typography>
                                    </Button>
                                    <ColorButton
                                        loading={isSubmitting}
                                        variant="contained"
                                        style={{ margin: "1rem 0.6rem" }}
                                        type="submit"
                                    >
                                        <Typography variant="subtitle2">{item ? "Atualizar" : "Adicionar"}</Typography>
                                    </ColorButton>
                                </Grid>
                            </Grid>
                        </form>
                    );
                }}
            </Formik>
        </Modal>
    );

    const configList = {
        data: list,
        headers,
        filter,
        search,
        setSearch,
        component: ComponentCreateEdit,
        title: "Lista de Raças",
        openDeleteModal,
        setOpenDeleteModal: () => closeDelete(),
        actionRemove,
        item
    }

    return (
        <ListDefault {...configList} />
    )
}

export default Owners;
