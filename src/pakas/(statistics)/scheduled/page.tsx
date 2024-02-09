"use client";

import { Statistics } from "@/components";
import { AppointmentStatus } from "@/redux/features/appointments/appointmentsSlice";
import { Container } from "@mui/material";
import Head from "next/head";

function PageStcsSchedule(): React.ReactNode {
  return (
    <>
      <Head>
        <title>RSystfip | Statistics scheduled people</title>
      </Head>

      <Container component="main" maxWidth="xl">
        <Statistics appointment_status={AppointmentStatus.scheduled} />
      </Container>
    </>
  );
}

export default PageStcsSchedule;
