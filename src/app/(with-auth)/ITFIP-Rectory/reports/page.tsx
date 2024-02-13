import { Report } from "@/components";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Reports",
};

function PageReportsPeople(): React.ReactNode {
  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {"Reportes por mes"}
      </Typography>

      <Report />
    </Container>
  );
}

export default PageReportsPeople;
