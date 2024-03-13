import { TableUsers } from "@/components";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "RSystfip | Users",
};

async function PageUsers(): Promise<React.ReactElement> {
  const t = await getTranslations("PageUsers");

  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginY={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {t("title")}
      </Typography>

      <Tooltip title={t("add")}>
        <Fab
          component={NextLink}
          href="/ITFIP-Rectory/users/create"
          variant="circular"
          size="small"
          color="primary"
          sx={{ mb: 2 }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <TableUsers />
    </Container>
  );
}

export default PageUsers;
