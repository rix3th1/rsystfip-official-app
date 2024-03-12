import { TableHistoryPeople } from "@/components";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
        {"Scheduled People"}
      </Typography>

      <TableHistoryPeople />
    </Container>
  );
}

export default PageHistoryPeople;
