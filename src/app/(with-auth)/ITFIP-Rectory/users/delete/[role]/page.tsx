import { TableUsers } from "@/components";
import AddIcon from "@mui/icons-material/Add";
import { Container, Fab, Typography } from "@mui/material";
import { type Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "RSystfip | Users",
};

function PageUsers(): React.ReactNode {
  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginY={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        Administrar usuarios
      </Typography>

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

      <TableUsers />
    </Container>
  );
}

export default PageUsers;
