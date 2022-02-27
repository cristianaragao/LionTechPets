import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): Data {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: string;
    label: string;
}

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
    headers: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort, headers } =
        props;
    const createSortHandler =
        (property: string) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headers.map((headCell: any, index: number) => (
                    <TableCell
                        key={headCell.id}
                        align={index === headers.length - 1 ? 'right' : 'left'}
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ color: "#49708A", cursor: 'pointer' }}
                    >
                        {
                            headCell.id !== "actions" ?
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                                : headCell.label
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

type TableProps = {
    filter: (a: any) => boolean;
    headers: HeadCell[];
    data: any[];
    search: string;
}

export default function EnhancedTable(props: TableProps) {

    const { headers, data, filter, search } = props;

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>("");

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    if (search !== "" && data.filter(filter).length === 0)
        return (
            <TableContainer>
                <Typography variant="subtitle2" style={{ margin: "2rem auto", textAlign: "center" }}>Nenhum registro encontrado.</Typography>
            </TableContainer>
        )


    return (
        <TableContainer>
            {
                data.length > 0 ?
                    <Table>

                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            headers={headers}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>

                            {stableSort(data, getComparator(order, orderBy))
                                .filter(filter)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {

                                    return (
                                        <TableRow
                                            hover
                                            key={index}
                                        >
                                            {
                                                Object.values(row).map((r: any, i: number) => {

                                                    if (i === Object.values(row).length - 1) return <TableCell key={i} padding="none" align="right">{r}</TableCell>

                                                    return <TableCell key={i} padding="none" align="left" style={{ paddingLeft: "1rem" }}>{r}</TableCell>
                                                }
                                                )
                                            }
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    :
                    <Typography variant="subtitle2" style={{ margin: "2rem auto", textAlign: "center" }}>Lista vazia. Adicione nela!</Typography>
            }


            {data.length > 5 && <TablePagination
                showFirstButton
                showLastButton
                labelRowsPerPage="Linhas por pagina: 5"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}

        </TableContainer>
    );
}
