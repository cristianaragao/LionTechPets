import React, { useState } from "react";
import type { NextPage } from "next";

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

import SessionService from "../services/SessionService";

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
    confirmPassword?: string;
}

const initialValues: FormValues = {
    username: "",
    password: "",
    confirmPassword: "",
}

const messageRequired: string = "Campo obrigatório.";

const validationSchema = yup.object({
    username: yup.string().trim().required(messageRequired),
    password: yup.string().trim().required(messageRequired),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Senhas estão diferentes.').required(messageRequired)
})

const Login: NextPage = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
                backgroundRepeat: "no-repeat",
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
                        Cadastro
                    </Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values: FormValues, helpers) => {

                            const { setSubmitting } = helpers;

                            const service = SessionService;

                            const submitted: boolean = await service.signup(values);

                            setSubmitting(false);

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

                                <FormControl error={Boolean(errors.confirmPassword) && touched.confirmPassword} sx={{ m: 1, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="confirmPassword">Confirmação de senha</InputLabel>
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {Boolean(errors.confirmPassword) && touched.confirmPassword && <FormHelperText id="confirmPassword-error">{errors.confirmPassword}</FormHelperText>}
                                </FormControl>

                                <Link href="/login" passHref>
                                    <Typography variant="caption" margin="0.5rem auto" color="#49708A" style={{ cursor: 'pointer' }}>Já tem uma conta? Faça login!</Typography>
                                </Link>

                                <ColorButton
                                    loading={isSubmitting}
                                    variant="contained"
                                    style={{ margin: "1rem auto" }}
                                    type="submit"
                                >
                                    <Typography variant="subtitle2">
                                        Criar
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
