import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

import Modal from "@mui/material/Modal";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  boxShadow: 1,
  borderRadius: 1,
  p: "1rem 2rem",
};

interface ModalI {
  label?: string | React.ReactNode;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  children: React.ReactElement<any, any>;
  remove?: boolean;
}

export default function TransitionsModal({
  label,
  open,
  handleOpen,
  handleClose,
  children,
  remove
}: ModalI) {
  return (
    <>
      { !remove &&
        <Button
          style={{ width: "25ch", backgroundColor: "#59B09E" }}
          variant="contained"
          onClick={() => handleOpen()}
          size="medium"
        >
          {label}
        </Button>
      }
      {open && (
        <Modal
          open={open}
          onClose={() => handleClose()}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "center",
          }}
        >
          <Box sx={{ ...style }}>{children}</Box>
        </Modal>
      )}
    </>
  );
}
