import { RecoveryPassword } from "@/components";
import { RectoryAddress } from "@/components/ui";
import Container from "@mui/material/Container";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageRecoverPassword");
  return {
    title: `RSystfip | ${t("metadata.title")}`,
  };
}

function PageRecoverPassword(): React.ReactNode {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <RecoveryPassword />

      <RectoryAddress sx={{ mt: 5 }} />
    </Container>
  );
}

export default PageRecoverPassword;
