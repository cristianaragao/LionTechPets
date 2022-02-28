import * as React from 'react';

import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import BreedService, { BreedType } from '../../services/BreedService';

const useComponentWillMount = (cb: () => void) => {
  const willMount = React.useRef(true)

  if (willMount.current) cb()

  willMount.current = false;
}

export default function Asynchronous(props: AutocompleteProps<any, any, any, any, any>): JSX.Element {

  const { id, renderInput, onChange, value } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<BreedType[]>([]);

  const initialize = async () => {
    const result = await BreedService.list();

    setOptions([...result]);
  }

  useComponentWillMount(initialize);

  React.useEffect(() => {
    let active = true;

    (async () => {

      const result = await BreedService.list();

      if (active) {
        setOptions([...result]);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Autocomplete
      id={id}
      noOptionsText="Sem opções"
      open={open}
      value={value}
      onChange={onChange}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => value.id == option.id}
      getOptionLabel={(option: BreedType) => option?.name ? option.name : ""}
      options={options}
      renderInput={renderInput}
    />
  )
}