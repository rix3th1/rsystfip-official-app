import { Report } from "@/components";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "RSystfip | Reports",
};

async function PageReportsPeople(): Promise<React.ReactElement> {
  const t = await getTranslations("PageReportsPeople");

  return (
    <Container component="main" maxWidth="xl">
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      >
        {t("title")}
      </Typography>

      <Report />
    </Container>
  );
}

export default PageReportsPeople;
