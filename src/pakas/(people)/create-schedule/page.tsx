"use client";

import { FullCalendarScheduling } from "@/components";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Container, Typography } from "@mui/material";
import Head from "next/head";

const plugins = [dayGridPlugin, timeGridPlugin];

function PageScheduleScheduling(): React.ReactNode {
  return (
    <>
      <Head>
        <title>RSystfip | Programming scheduling</title>
      </Head>

      <Container component="main" maxWidth="xl">
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
        >
          Agendamiento programado
        </Typography>

        <FullCalendarScheduling
          right="timeGridDay,timeGridWeek"
          initialView="timeGridDay"
          plugins={plugins}
        />
      </Container>
    </>
  );
}

export default PageScheduleScheduling;
