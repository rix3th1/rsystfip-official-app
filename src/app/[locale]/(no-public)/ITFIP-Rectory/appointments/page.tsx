import { Fca } from "@/components";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageAppointments");
  return {
    title: `RSystfip | ${t("matadata.title")}`,
  };
}

async function PageAppointments(): Promise<React.ReactElement> {
  const t = await getTranslations("PageAppointments");

  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {t("title")}
      </Typography>

      <Fca />
    </Container>
  );
}

export default PageAppointments;
