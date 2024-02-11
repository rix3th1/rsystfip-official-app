import Fcs from "@/components/Fcs";
import { Container, Typography } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Programming scheduling",
};

function PageScheduleScheduling(): React.ReactNode {
  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        Agendamiento programado
      </Typography>

      <Fcs />
    </Container>
  );
}

export default PageScheduleScheduling;
