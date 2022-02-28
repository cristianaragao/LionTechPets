import React, { useState, useContext } from "react";

import {
    Grid,
    OutlinedInput,
    InputAdornment,
    Button,
    Typography,
    ButtonProps,
    Box,
    Paper,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";

import Base from "../components/Base";
import Table from "../components/Table";

import Modal from "../components/Modal";

import { AuthContext } from "../components/contexts/AuthContext";

const ColorButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#59B09E",
    "&:hover": {
        boxShadow: "1px solid black",
        backgroundColor: "#59B09E",
    },
}));


type Header = {
    id: string;
    label: string;
};

export type ListProps = {
    title: string;
    headers: Header[];
    data: any[];
    filter: (a: any) => boolean;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    component: JSX.Element;
    openDeleteModal: boolean;
    actionRemove: () => void;
    setOpenDeleteModal: () => void;
    item?: any;
};

type TableProps = {
    filter: (a: any) => boolean;
    headers: Header[];
    data: any[];
    search: string;
};

const ListDefault: React.FC<ListProps> = (props) => {

    const { username } = useContext(AuthContext);

    const [loading, setLoading] = useState<boolean>(false);

    const {
        title,
        data,
        headers,
        filter,
        search,
        setSearch,
        component,
        openDeleteModal,
        actionRemove,
        item,
        setOpenDeleteModal
    } = props;

    const tableConfig: TableProps = {
        filter,
        headers,
        data,
        search,
    };

    return (
        <Base title={title}>
            <Grid container spacing={2}>
                {
                    openDeleteModal &&
                    <Modal
                        open={openDeleteModal}
                        remove={true}
                        handleOpen={() => { }}
                        handleClose={setOpenDeleteModal}
                    >
                        <Grid container
                            spacing={2}
                            style={{
                                display: "flex",
                                marginTop: "0rem",
                                flexDirection: "column",
                                alignItems: "center",
                                minWidth: "15rem",
                            }}>

                            <Grid item xs={12} sm={12} marginTop="0rem">
                                <Typography variant="subtitle1" fontWeight="bold">Quer mesmo excluir {item.name} ?</Typography>


                            </Grid>

                            <Grid item sm={12} xs={12}>
                                <Button
                                    variant="contained"
                                    disabled={loading}
                                    color="error"
                                    style={{ margin: "0rem 0.6rem" }}
                                    onClick={setOpenDeleteModal}
                                >
                                    <Typography variant="subtitle2">Fechar</Typography>
                                </Button>
                                <ColorButton
                                    loading={loading}
                                    variant="contained"
                                    style={{ margin: "0rem 0.6rem" }}
                                    onClick={() => {
                                        setLoading(true);
                                        actionRemove();
                                        setLoading(false);
                                    }}
                                >
                                    <Typography variant="subtitle2">Excluir</Typography>
                                </ColorButton>
                            </Grid>
                        </Grid>
                    </Modal>}

                <Grid item xs={12} style={{ display: 'flex', justifyContent: "space-between", alignItems: "baseline" }}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography fontWeight="bold" color="#254960">Logado como {username}</Typography>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        marginTop: { xs: "1rem" },
                    }}
                >
                    <OutlinedInput
                        autoComplete="off"
                        id="search"
                        placeholder="Buscar..."
                        type="text"
                        value={search}
                        size="small"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setSearch(event.target.value)
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        display: "flex",
                        alignItems: "end",
                        flexDirection: { xs: "row", sm: "row-reverse" },
                    }}
                >
                    {component}
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                        <Table {...tableConfig} />
                    </Paper>
                </Grid>
            </Grid>
        </Base >
    );
};

export default ListDefault;
