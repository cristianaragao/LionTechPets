import React, { useState } from "react";
import { NextPage } from "next";

import { useRouter } from 'next/router'

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
    color: "#000",
    backgroundColor: "#CAFF42",
    '&:hover': {
        boxShadow: "1px solid black",
        backgroundColor: "#CAFF01",
    },
}));

interface FormValues {
    email: string;
    password: string;
}

const initialValues: FormValues = {
    email: "",
    password: ""
}

const validationSchema: yup.AnyObjectSchema = yup.object({
    email: yup.string().trim().email('Digite um email válido.').required('Email é obrigatório.'),
    password: yup.string().trim().required('Senha é obrigatória.')
})

const Login: NextPage = () => {

    const routersNext = useRouter();

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

                            await routersNext.push("/pets");

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

                                <FormControl error={Boolean(errors.email) && touched.email} sx={{ m: 1, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input
                                        id="email"
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {Boolean(errors.email) && touched.email && <FormHelperText id="email-error">{errors.email}</FormHelperText>}
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

                                <Link href="/signup">
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
