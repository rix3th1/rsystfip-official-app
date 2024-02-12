import { FetcherDataForChangePsw } from "@/components";
import { Container } from "@mui/material";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RSystfip | Change password",
};

function PageChangePassword(): React.ReactNode {
  return (
    <Container component="main" maxWidth="sm">
      <FetcherDataForChangePsw />
    </Container>
  );
}

export default PageChangePassword;
