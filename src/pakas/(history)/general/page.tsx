"use client";

import { TableHistoryPeople } from "@/components";
import { Container, Typography } from "@mui/material";
import Head from "next/head";

function PageHistoryPeople(): React.ReactNode {
  return (
    <>
      <Head>
        <title>RSystfip | People history</title>
      </Head>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
        >
          Personas agendadas
        </Typography>

        <TableHistoryPeople />
      </Container>
    </>
  );
}

export default PageHistoryPeople;
