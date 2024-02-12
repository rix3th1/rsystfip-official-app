import { TableHistoryPeople } from "@/components";
import { Container, Typography } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | People history",
};

function PageHistoryPeople(): React.ReactNode {
  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {"Personas agendadas"}
      </Typography>

      <TableHistoryPeople />
    </Container>
  );
}

export default PageHistoryPeople;
