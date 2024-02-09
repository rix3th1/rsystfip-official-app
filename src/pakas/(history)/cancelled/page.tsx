"use client";

import { TableHistoryCanceledPeople } from "@/components";
import { Container, Typography } from "@mui/material";
import Head from "next/head";

function PageHistoryCancelledPeople(): React.ReactNode {
  return (
    <>
      <Head>
        <title>RSystfip | Canceled people history</title>
      </Head>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
        >
          Citas canceladas
        </Typography>

        <TableHistoryCanceledPeople />
      </Container>
    </>
  );
}

export default PageHistoryCancelledPeople;
