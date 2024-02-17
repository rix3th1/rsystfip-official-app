import { FormSchedulePeople } from "@/components";
import { propsAction } from "@/types/propsAction";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Daily scheduling",
};

function PageDailyScheduling(): React.ReactNode {
  return (
    <Container component="main" maxWidth="md">
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
        <Typography component="h1" variant="h5" gutterBottom align="center">
          {"Daily Scheduling"}
        </Typography>

        <FormSchedulePeople action={propsAction.add} />
      </Paper>
    </Container>
  );
}

export default PageDailyScheduling;
