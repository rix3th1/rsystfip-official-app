import { RecoveryPassword } from "@/components";
import { Copyright } from "@/components/ui";
import { Container } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Recover password",
};

function PageRecoverPassword(): React.ReactNode {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <RecoveryPassword />

      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default PageRecoverPassword;
