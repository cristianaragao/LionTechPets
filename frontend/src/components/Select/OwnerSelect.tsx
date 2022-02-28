import * as React from 'react';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import OwnerService, { OwnerType } from '../../services/OwnerService';

const useComponentWillMount = (cb: () => void) => {
  const willMount = React.useRef(true)

  if (willMount.current) cb()

  willMount.current = false;
}

export default function Asynchronous(props: AutocompleteProps<any, any, any, any, any>): JSX.Element {

  const { id, renderInput, onChange, value } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<OwnerType[]>([]);

  const initialize = async () => {
    const result = await OwnerService.list();

    setOptions([...result]);
  }

  useComponentWillMount(initialize);

  React.useEffect(() => {
    let active = true;

    (async () => {

      const result = await OwnerService.list();

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
      open={open}
      value={value}
      noOptionsText="Sem opções"
      onChange={onChange}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option: OwnerType) => option?.name ? option.name : ""}
      options={options}
      renderInput={renderInput}
    />
  )
}