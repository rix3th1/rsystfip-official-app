import { ProtectedElement } from "@/components/ui";
import authOptions from "@/libs/authOptions";
import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "RSystfip | Home",
};

async function PageHome(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const permissions = session?.user.permissions!;
  const isAllowed = permissions.includes("add");

  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {`${"Bienvenido(a)"} ${session?.user.role_name}: ${
          session?.user.first_name
        } ${session?.user.last_name}`}
      </Typography>

      <ButtonGroup variant="outlined">
        <ProtectedElement isAllowed={isAllowed}>
          <Button component={NextLink} href="/people/create">
            Agendamiento diario
          </Button>
        </ProtectedElement>

        <Button component={NextLink} href="/people/create-schedule">
          Agendamiento programado
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default PageHome;
