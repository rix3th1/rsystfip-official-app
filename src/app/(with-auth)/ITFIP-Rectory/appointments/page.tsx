import Fca from "@/components/Fca";
import { Container, Typography } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Appointments",
};

function PageAppointments() {
  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        Ver agendamientos programados
      </Typography>

      <Fca />
    </Container>
  );
}

export default PageAppointments;
