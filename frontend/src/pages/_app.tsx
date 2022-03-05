import * as React from "react";

import { AppProps } from "next/app";
import Head from "next/head";

import "../components/styles/globals.css";

import favicon from "../../public/favicon.ico";

import { AuthProvider } from "../components/contexts/AuthContext";

import { Notifier } from "../components/SnackBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={favicon.src} />
        <title>Create</title>
      </Head>
      <AuthProvider>
        <>
          <Component {...pageProps} />
          <Notifier />
        </>
      </AuthProvider>
    </>
  );
}
