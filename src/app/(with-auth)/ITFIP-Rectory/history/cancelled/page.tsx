import { TableHistoryCanceledPeople } from "@/components";
import { Container, Typography } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Canceled people history",
};

function PageHistoryCancelledPeople(): React.ReactNode {
  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {"Citas canceladas"}
      </Typography>

      <TableHistoryCanceledPeople />
    </Container>
  );
}

export default PageHistoryCancelledPeople;
