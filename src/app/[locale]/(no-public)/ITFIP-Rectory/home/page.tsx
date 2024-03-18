import { ProtectedElement } from "@/components/ui";
import authOptions from "@/libs/authOptions";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import NextLink from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageHome");
  return {
    title: `RSystfip | ${t("metadata.title")}`,
  };
}

async function PageHome(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const permissions = session?.user.permissions!;
  const isAllowed = permissions.includes("add");

  const t = await getTranslations("PageHome");

  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {t("title")} <b>{session?.user.role_name}:</b>
        {` ${session?.user.first_name} ${session?.user.last_name}`}
      </Typography>

      <ButtonGroup variant="outlined">
        <ProtectedElement isAllowed={isAllowed}>
          <Button component={NextLink} href="/ITFIP-Rectory/people/create">
            {t("button1")}
          </Button>
        </ProtectedElement>

        <Button
          component={NextLink}
          href="/ITFIP-Rectory/people/create-schedule"
        >
          {t("button2")}
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default PageHome;
