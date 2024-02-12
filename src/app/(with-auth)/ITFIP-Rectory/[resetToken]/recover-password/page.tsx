import { RecoveryLinkPassword } from "@/components";
import { Container } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Recover password",
};

function PageLinkRecoveryPsw(): React.ReactNode {
  return (
    <Container component="main" maxWidth="sm">
      <RecoveryLinkPassword />
    </Container>
  );
}

export default PageLinkRecoveryPsw;
