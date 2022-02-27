import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: "35%",
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 1,
  p: 4,
};

interface ModalI {
  label: string | React.ReactNode;
  children: React.ReactElement<any, any>;
}

export default function TransitionsModal({
  label,
  children
}: ModalI) {

  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        style={{ width: '25ch', backgroundColor: "#59B09E" }}
        variant="contained"
        onClick={handleOpen}
      >
        {label}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "center"
        }}
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>

      </Modal>
    </>
  );
}
