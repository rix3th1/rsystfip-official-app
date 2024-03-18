import { FormSchedulePeople } from "@/components";
import { PropsAction } from "@/enums";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageEditPeople");
  return {
    title: `RSystfip | ${t("metadata.title")}`,
  };
}

async function PageEditPeople(): Promise<React.ReactElement> {
  const t = await getTranslations("PageEditPeople");

  return (
    <Container component="main" maxWidth="md">
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
        <Typography component="h1" variant="h5" gutterBottom align="center">
          {t("title")}
        </Typography>

        <FormSchedulePeople action={PropsAction.edit} />
      </Paper>
    </Container>
  );
}

export default PageEditPeople;
