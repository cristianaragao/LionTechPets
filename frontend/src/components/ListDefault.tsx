import React from "react";

import {
    Grid,
    OutlinedInput,
    InputAdornment,
    Button,
    Typography,
    Paper,
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

import Base from "../components/Base";
import Table from "../components/Table";

import Modal from "../components/Modal";

type Header = {
    id: string;
    label: string;
}

export type ListProps = {
    title: string;
    labelAdd: string;
    headers: Header[];
    data: any[];
    filter: (a: any) => boolean;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

type TableProps = {
    filter: (a: any) => boolean;
    headers: Header[];
    data: any[];
    search: string;
}

const ListDefault: React.FC<ListProps> = (props) => {

    const { title, data, headers, labelAdd, filter, search, setSearch } = props;

    const tableConfig: TableProps = {
        filter,
        headers,
        data,
        search
    }

    return (
        <Base title={title}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography variant="h6">{title}</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <OutlinedInput
                        autoComplete="off"
                        id="search"
                        placeholder="Buscar..."
                        type="text"
                        value={search}
                        size="small"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
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
                        flexDirection: { xs: "row", sm: "row-reverse" }
                    }}
                    display="flex"
                >

                    <Modal label={labelAdd}>
                        <div>{labelAdd}</div>
                    </Modal>

                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Table {...tableConfig} />
                    </Paper>
                </Grid>

            </Grid>

        </Base>
    )
}

export default ListDefault;
