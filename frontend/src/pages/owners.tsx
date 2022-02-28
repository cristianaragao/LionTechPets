import React, { useState, useEffect } from "react";
import { NextPage } from "next";

import InputMask from "react-input-mask";

import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";

import {
    IconButton,
    Grid,
    TextField,
    ButtonProps,
    Button,
    Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { TextFieldProps } from "@mui/material/TextField";

import { Formik, FormikProps } from "formik";
import "yup-phone";
import * as yup from "yup";

import Modal from "../components/Modal";
import ListDefault from "../components/ListDefault";
import OwnerService, { OwnerType } from "../services/OwnerService";

const ColorButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#59B09E",
    "&:hover": {
        boxShadow: "1px solid black",
        backgroundColor: "#59B09E",
    },
}));

type OwnerList = {
    name: string;
    phone: string;
};

const headers = [
    {
        id: "name",
        label: "Nome",
    },
    {
        id: "phone",
        label: "Telefone",
    },
    {
        id: "actions",
        label: "Ações",
    },
];

const messageRequired: string = "Campo obrigatório.";

const Owners: NextPage = () => {
    const [list, setList] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [item, setItem] = useState<OwnerType | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const openEdit = (pet: OwnerType) => {
        setItem(pet);
        setOpenModal(true);
    }

    const closeEdit = (): void => {
        setItem(null);
        setOpenModal(false);
    }

    const openDelete = (item: OwnerType) => {
        setItem(item);
        setOpenDeleteModal(true);
    }

    const closeDelete = () => {
        setOpenDeleteModal(false);
        setItem(null);
    }

    const initialValues: OwnerList = {
        name: item ? item.name : "",
        phone: item ? item.phone : "",
    };

    const validationSchema: yup.AnyObjectSchema = yup.object().shape({
        name: yup.string().trim().required(messageRequired),
        phone: yup
            .string()
            .trim()
            .required(messageRequired)
            .phone("pt-BR", false, "Número de telefone inválido"),
    });

    const filter = (a: OwnerList) => {
        if (a.name.toLowerCase().includes(search.toLowerCase())) return true;
        if (a.phone.includes(search)) return true;

        return false;
    };

    const load = async () => {
        const result = await OwnerService.list();

        const data = result.map((item: OwnerType) => {
            return {
                name: item.name,
                phone: item?.phone ? item.phone : "Não informado",
                actions: (
                    <>
                        <IconButton color="primary" onClick={() => openEdit(item)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => openDelete(item)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                ),
            };
        });

        setList(data);
    };

    useEffect(() => {

        load();
    }, []);

    const actionRemove = async() => {

        if(!item?.id) return;

        const submitted: boolean = await OwnerService.delete(item.id);

        if(!submitted) return;

        closeDelete();

        await load();

    }

    const ComponentCreate = (
        <Modal
            open={openModal}
            handleOpen={() => setOpenModal(true)}
            handleClose={item ? () => closeEdit() : () => setOpenModal(false)}
            label="Adicionar novo dono"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values: OwnerList, helpers) => {
                    const { setSubmitting } = helpers;

                    const data: OwnerType = {
                        ...values
                    }

                    const submitted: boolean = item?.id ? await OwnerService.update(item.id, data) : await OwnerService.create(values);

                    setSubmitting(false);

                    if(!submitted) return;

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
                }: FormikProps<OwnerList>) => {

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

                                <Grid item sm={12} xs={12}>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        id="phone"
                                        type="tel"
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {(inputProps: TextFieldProps) => (
                                            <TextField
                                                {...inputProps}
                                                label="Telefone"
                                                error={Boolean(errors.phone) && Boolean(touched.phone)}
                                                helperText={
                                                    Boolean(errors.phone) && Boolean(touched.phone)
                                                        ? errors.phone
                                                        : ""
                                                }
                                            />
                                        )}
                                    </InputMask>
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
        component: ComponentCreate,
        title: "Lista de Donos",
        openDeleteModal,
        setOpenDeleteModal: () => closeDelete(),
        actionRemove,
        item
    };

    return <ListDefault {...configList} />;
};

export default Owners;
