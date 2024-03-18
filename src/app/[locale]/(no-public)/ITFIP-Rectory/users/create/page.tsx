import { FormUserAdd } from "@/components";
import type { TPermission } from "@/interfaces";
import authOptions from "@/libs/authOptions";
import { redirect } from "@/navigation";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageRegisterUser");
  return {
    title: `RSystfip | ${t("title")}`,
  };
}

async function PageRegisterUser(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const permissions = session?.user.permissions! as TPermission[];

  const isAllowed = permissions.includes("admin");

  if (!isAllowed) {
    redirect("/ITFIP-Rectory/home");
  }

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
