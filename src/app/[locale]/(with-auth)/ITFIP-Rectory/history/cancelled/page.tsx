import { TableHistoryCanceledPeople } from "@/components";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "RSystfip | Canceled people history",
};

async function PageHistoryCancelledPeople(): Promise<React.ReactElement> {
  const t = await getTranslations("PageHistoryCancelledPeople");

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

      <TableHistoryCanceledPeople />
    </Container>
  );
}

export default PageHistoryCancelledPeople;
