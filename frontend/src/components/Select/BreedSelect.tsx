import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import BreedService, { BreedType } from '../../services/BreedService';

interface Props {
  id: string;
  value: BreedType;
  error: string;
  handleChange: () => void;
  handleBlur: () => void;
}

export default function Asynchronous(props: Props) {

  const {
    id,
    value,
    error,
    handleChange,
    handleBlur
  } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<BreedType[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      
      const result = await BreedService.list();

      if (active) {
        setOptions([...result]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id={id}
      sx={{ width: 300 }}
      open={open}
      value={value}
      onChange={handleChange}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Raças"
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}