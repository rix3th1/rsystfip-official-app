import Faqs from "@/components/Faqs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Frequently Asked Questions",
};

function PageFaqs(): React.ReactNode {
  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {"Frequently Asked Questions"}
      </Typography>

      <Faqs />
    </Container>
  );
}

export default PageFaqs;
