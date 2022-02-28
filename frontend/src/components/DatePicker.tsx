import * as React from 'react';
import ptLocale from 'date-fns/locale/pt';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const localeMap = {
    pt: ptLocale
};

const maskMap = {
    pt: '__/__/____'
};

export default function LocalizedDatePicker(props: DatePickerProps) {

    const { onChange, value, renderInput } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap["pt"]}>

            <DatePicker
                {...props}
                inputFormat="dd/MM/yyyy"
                mask={maskMap["pt"]}
                value={value}
                onChange={onChange}
                renderInput={renderInput}
            />

        </LocalizationProvider>
    );
}
