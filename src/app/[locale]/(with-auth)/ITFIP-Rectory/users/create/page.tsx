import { FormUserAdd } from "@/components";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageRegisterUser");
  return {
    title: `RSystfip | ${t("title")}`,
  };
}

async function PageRegisterUser(): Promise<React.ReactElement> {
  const t = await getTranslations("PageRegisterUser");

  return (
    <Container component="main" maxWidth="md">
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
        <Typography component="h1" variant="h5" gutterBottom align="center">
          {t("title")}
        </Typography>

        <FormUserAdd />
      </Paper>
    </Container>
  );
}

export default PageRegisterUser;
