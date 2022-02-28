import React, { useEffect, useState } from "react";

/* MATERIAL UI/CORE/ */
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type showMessageType = {
    message: string;
    type: "success" | "warning" | "error" | "info";
}

let showMessage: (props: showMessageType) => void;

type Message = {
    open: boolean;
    text: string;
    type: "success" | "warning" | "error" | "info";
}

const duration: number = 3.5; //Seconds

export const Notifier = () => {

    const [message, setMessage] = useState<Message>({
        open: false,
        text: "",
        type: "success"
    });

    const { open, text, type } = message;

    useEffect(() => {
        showMessage = ({ message, type }: showMessageType) => {
            setMessage({
                open: true,
                text: message,
                type: type,
            });
        };
    });


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage({
            ...message,
            open: false
        });

    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={duration * 1000}
            open={open}
            onClose={handleClose}
        >
            <Alert severity={type} onClose={handleClose}>
                {text}
            </Alert>
        </Snackbar>
    )

}

const openSnackbar = ({ message, type }: showMessageType) => showMessage({ message, type });

export default openSnackbar;

