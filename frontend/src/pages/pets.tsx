import React, { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";

import { parseCookies } from "nookies";

import moment from "moment";

import {
    IconButton,
    Grid,
    TextField,
    ButtonProps,
    Button,
    Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { styled } from "@mui/material/styles";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import ListDefault from "../components/ListDefault";
import DatePicker from "../components/DatePicker";
import SelectOwner from "../components/Select/OwnerSelect";
import SelectBreed from "../components/Select/BreedSelect";

import Modal from "../components/Modal";

import PetService, { PetType } from "../services/PetService";
import { OwnerType } from "../services/OwnerService";
import { BreedType } from "../services/BreedService";

const ColorButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#59B09E",
    "&:hover": {
        boxShadow: "1px solid black",
        backgroundColor: "#59B09E",
    },
}));

type PetList = {
    name: string;
    birthday: string;
    owner: string;
    breed: string;
};

type FormValues = {
    name: string;
    birthday: Date;
    breed?: BreedType;
    owner?: OwnerType;
};

const headers = [
    {
        id: "name",
        label: "Nome",
    },
    {
        id: "birthday",
        label: "Aniversário",
    },
    {
        id: "owner",
        label: "Dono",
    },
    {
        id: "breed",
        label: "Raça",
    },
    {
        id: "actions",
        label: "Ações",
    },
];

const messageRequired: string = "Campo obrigatório.";
const messageDateInvalid: string = "Data inválida.";

const Pets: NextPage = () => {
    const [pets, setPets] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [item, setItem] = useState<PetType | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const openEdit = (pet: PetType) => {
        setItem(pet);
        setOpenModal(true);
    }

    const closeEdit = (): void => {
        setItem(null);
        setOpenModal(false);
    }

    const openDelete = (pet: PetType) => {
        setItem(pet);
        setOpenDeleteModal(true);
    }

    const closeDelete = () => {
        setOpenDeleteModal(false);
        setItem(null);
    }

    const initialValues: FormValues = {
        name: item ? item.name : "",
        birthday: item ? item.birthday : new Date(),
        owner: item ? item.owner : undefined,
        breed: item ? item.breed : undefined,
    };

    const validationSchema: yup.AnyObjectSchema = yup.object().shape({
        name: yup.string().trim().required(messageRequired),
        birthday: yup
            .date()
            .typeError(messageDateInvalid)
            .nullable()
            .min(moment().subtract(153, "years"), "Aniversário não pode ser pré-histórico.")
            .max(moment().hours(23).minutes(59), "Aniversário não pode ser futuro.")
            .required(messageRequired),
        owner: yup.object().nullable().required(messageRequired),
        breed: yup.object().nullable().required(messageRequired),
    });

    const filter = (a: PetList) => {
        if (a.name.toLowerCase().includes(search.toLowerCase())) return true;
        if (a.owner.includes(search)) return true;
        if (a.breed.includes(search)) return true;
        if (a.birthday.includes(search)) return true;

        return false;
    };

    const load = async () => {
        const result = await PetService.list();

        const data = result.map((pet: PetType) => {
            return {
                name: pet.name,
                birthday: moment(pet.birthday).format("DD/MM/YYYY"),
                owner: pet?.owner?.name ? pet.owner.name : "Nenhum dono",
                breed: pet?.breed?.name ? pet.breed.name : "Nenhuma raça",
                actions: (
                    <>
                        <IconButton color="primary" onClick={() => openEdit(pet)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => openDelete(pet)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                ),
            };
        });

        setPets(data);
    };


    useEffect(() => {
        load();
    }, []);

    const actionRemove = async () => {

        if (!item?.id) return;

        await PetService.delete(item.id);

        closeDelete();

        await load();

    }

    const ComponentCreate = (
        <Modal
            open={openModal}
            handleOpen={() => setOpenModal(true)}
            handleClose={item ? () => closeEdit() : () => setOpenModal(false)}
            label="Adicionar novo pet"
        >

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values: FormValues, helpers) => {
                    const { setSubmitting } = helpers;

                    const data: PetType = {
                        ...values,
                        ownerId: values?.owner?.id ? values.owner.id : "",
                        breedId: values?.breed?.id ? values.breed.id : "",
                    }

                    const submitted: boolean = item?.id ? await PetService.update(item.id, data) : await PetService.create(data);

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
                    setFieldValue,
                    setFieldTouched,
                    handleBlur,
                    handleSubmit,
                }: FormikProps<FormValues>) => {
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
                                        helperText={Boolean(errors.name) && Boolean(touched.name) ? errors.name : ""}
                                    />
                                </Grid>

                                <Grid item sm={12} xs={12}>
                                    <DatePicker
                                        value={values.birthday}
                                        onChange={(
                                            date: unknown,
                                            keyboardInputValue?: string | undefined
                                        ) => setFieldValue("birthday", date)}
                                        maxDate={moment()}
                                        label="Aniversário"
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                id="birthday"
                                                onBlur={handleBlur}
                                                style={{ width: "23.5ch" }}
                                                error={Boolean(errors.birthday)}
                                                helperText={Boolean(errors.birthday) ? errors.birthday : ""}
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item sm={12} xs={12}>
                                    <SelectOwner
                                        id="ownerId"
                                        value={values.owner}
                                        defaultValue={values.owner}
                                        onChange={(id: any, owner: OwnerType) => {
                                            if (owner) setFieldValue("owner", owner);
                                            else setFieldValue("owner", null)
                                            setFieldTouched("owner", true);
                                        }}
                                        options={[]}
                                        onBlur={handleBlur}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Dono"
                                                onBlur={handleBlur}
                                                style={{ width: "23.5ch" }}
                                                error={Boolean(errors.owner) && Boolean(touched.owner)}
                                                helperText={Boolean(touched.owner) ? (Boolean(errors.owner) ? errors.owner : "") : ""}
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item sm={12} xs={12}>
                                    <SelectBreed
                                        id="breedId"
                                        value={values.breed}
                                        onChange={(event: any, owner: OwnerType) => {
                                            if (owner) setFieldValue("breed", owner);
                                            else setFieldValue("breed", null);
                                            setFieldTouched("breed", true);
                                        }}
                                        options={[]}
                                        onBlur={handleBlur}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                label="Raça"
                                                onBlur={handleBlur}
                                                style={{ width: "23.5ch" }}
                                                error={Boolean(errors.breed) && Boolean(touched.breed)}
                                                helperText={Boolean(touched.breed) ? (Boolean(errors.breed) ? errors.breed : "") : ""}
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item sm={12} xs={12}>
                                    <Button
                                        variant="contained"
                                        disabled={isSubmitting}
                                        color="error"
                                        style={{ margin: "1rem 0.6rem" }}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        <Typography variant="subtitle2">Fechar</Typography>
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
                    )
                }
                }
            </Formik>
        </Modal>
    );

    const configList = {
        data: pets,
        headers,
        filter,
        search,
        setSearch,
        component: ComponentCreate,
        title: "Lista de Pets",
        openDeleteModal,
        setOpenDeleteModal: () => closeDelete(),
        actionRemove,
        item
    };

    return (
        <ListDefault {...configList} />
    );
};

export default Pets;

export const serverSideRenderProps: GetServerSideProps = async (ctx) => {

    const { "pets.token": token } = parseCookies();

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}
