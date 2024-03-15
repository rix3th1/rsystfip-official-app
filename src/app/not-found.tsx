import { GoHome } from "@/components/ui";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageNotFound");
  return {
    title: `RSystfip | ${t("metadata.title")}`,
  };
}

async function PageNotFound(): Promise<React.ReactElement> {
  const t = await getTranslations("PageNotFound");

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Image
            src="/rsystfip_logotype.svg"
            alt="RSystfip logotype"
            width={72}
            height={57}
            priority
          />
        </Box>

        <Typography component="h1" variant="h3" gutterBottom>
          {t("title")}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {t("subtitle")}
        </Typography>

        <GoHome />
      </Box>
    </Container>
  );
}

export default PageNotFound;
