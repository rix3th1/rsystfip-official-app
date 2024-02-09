"use client";

import { Statistics } from "@/components";
import { AppointmentStatus } from "@/redux/features/appointments/appointmentsSlice";
import { Container } from "@mui/material";
import Head from "next/head";

function PageStcsDaily(): React.ReactNode {
  return (
    <>
      <Head>
        <title>RSystfip | Statistics daily people</title>
      </Head>

      <Container component="main" maxWidth="xl">
        <Statistics appointment_status={AppointmentStatus.daily} />
      </Container>
    </>
  );
}

export default PageStcsDaily;
