import Faqs from "@/components/Faqs";
import { Container, Typography } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Frecuently asked questions",
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
        {"Preguntas más frecuentes"}
      </Typography>

      <Faqs />
    </Container>
  );
}

export default PageFaqs;
