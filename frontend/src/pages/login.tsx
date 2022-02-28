import React, { useState, useContext } from "react";
import { NextPage } from "next";

import { AuthContext } from "../components/contexts/AuthContext";

import Router from 'next/router'

import Link from 'next/link'

import bg from "../components/assets/images/background.png";

import {
    Paper,
    Grid,
    Typography,
    FormControl,
    FormHelperText,
    InputLabel,
    Input,
    InputAdornment,
    IconButton
} from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';

import { Formik, FormikProps } from "formik";
import * as yup from 'yup';

const ColorButton = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#59B09E",
    '&:hover': {
        boxShadow: "1px solid black",
        backgroundColor: "#59B09E",
    },
}));

interface FormValues {
    username: string;
    password: string;
}

const initialValues: FormValues = {
    username: "",
    password: ""
}

const messageRequired: string = "Campo obrigatório.";

const validationSchema: yup.AnyObjectSchema = yup.object({
    username: yup.string().trim().required(messageRequired),
    password: yup.string().trim().required(messageRequired)
})

const Login: NextPage = () => {

    const { login } = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <Grid
            container
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${bg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Grid
                item
                xs={6}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    verticalAlign: "center",
                    alignItems: "center"
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="#49708A" marginTop="-2rem">
                    Liontech IR Pets
                </Typography>

                <Paper
                    elevation={3}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "2rem",
                        padding: "1rem 2rem",
                    }}
                >
                    <Typography variant="subtitle1" color="#49708A" marginTop="1rem">
                        Login
                    </Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async(values: FormValues, helpers) => {

                            const { setSubmitting } = helpers;

                            await login(values);

                            setSubmitting(false);
                            
                            return;
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        }: FormikProps<FormValues>) => (

                            <form autoComplete="off" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", minWidth: "15rem" }}>

                                <FormControl error={Boolean(errors.username) && touched.username} sx={{ m: 1, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="username">Nome de usuário</InputLabel>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {Boolean(errors.username) && touched.username && <FormHelperText id="username-error">{errors.username}</FormHelperText>}
                                </FormControl>

                                <FormControl error={Boolean(errors.password) && touched.password} sx={{ m: 1, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="password">Senha</InputLabel>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {Boolean(errors.password) && touched.password && <FormHelperText id="password-error">{errors.password}</FormHelperText>}
                                </FormControl>

                                <Link href="/signup" passHref>
                                    <Typography variant="caption" margin="0.5rem auto" color="#49708A" style={{ cursor: 'pointer' }}>Ainda não tem uma conta? Crie uma!</Typography>
                                </Link>

                                <ColorButton
                                    loading={isSubmitting}
                                    variant="contained"
                                    style={{ margin: "1rem auto" }}
                                    type="submit"
                                >
                                    <Typography variant="subtitle2">
                                        Login
                                    </Typography>
                                </ColorButton>

                            </form>
                        )}
                    </Formik>

                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
