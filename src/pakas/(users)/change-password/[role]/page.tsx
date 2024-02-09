"use client";

import { FetcherDataForChangePsw } from "@/components";
import { Container } from "@mui/material";
import Head from "next/head";

function PageChangePassword(): React.ReactNode {
  return (
    <>
      <Head>
        <title>RSystfip | Change password</title>
      </Head>

      <Container component="main" maxWidth="sm">
        <FetcherDataForChangePsw />
      </Container>
    </>
  );
}

export default PageChangePassword;
