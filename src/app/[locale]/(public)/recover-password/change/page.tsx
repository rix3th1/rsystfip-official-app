import { RecoveryLinkPassword } from "@/components";
import Container from "@mui/material/Container";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageRecoverPassword");
  return {
    title: `RSystfip | ${t("metadata.title")}`,
  };
}

function PageLinkRecoveryPsw(): React.ReactNode {
  return (
    <Container component="main" maxWidth="sm">
      <RecoveryLinkPassword />
    </Container>
  );
}

export default PageLinkRecoveryPsw;
