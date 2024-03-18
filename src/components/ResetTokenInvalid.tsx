"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { GoHome } from "./ui";

function ResetTokenInvalid(): React.ReactNode {
  const t = useTranslations("ResetTokenInvalid");

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

        <Typography variant="body1" gutterBottom textAlign="center">
          {t("subtitle")}
        </Typography>

        <GoHome />
      </Box>
    </Container>
  );
}

export default ResetTokenInvalid;
