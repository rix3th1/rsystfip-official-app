import { FetcherDataForChangePsw } from "@/components";
import Container from "@mui/material/Container";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageChangePassword");
  return {
    title: `RSystfip | ${t("metadata.title")}`,
  };
}

function PageChangePassword(): React.ReactNode {
  return (
    <Container component="main" maxWidth="sm">
      <FetcherDataForChangePsw />
    </Container>
  );
}

export default PageChangePassword;
