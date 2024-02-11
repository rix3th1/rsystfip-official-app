import { FormSchedulePeople } from "@/components";
import { propsAction } from "@/types/propsAction";
import { Container, Paper, Typography } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Daily scheduling",
};

function PageDailyScheduling(): React.ReactNode {
  return (
    <Container component="main" maxWidth="md">
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
        <Typography component="h1" variant="h5" gutterBottom align="center">
          Agendamiento diario
        </Typography>

        <FormSchedulePeople action={propsAction.add} />
      </Paper>
    </Container>
  );
}

export default PageDailyScheduling;
