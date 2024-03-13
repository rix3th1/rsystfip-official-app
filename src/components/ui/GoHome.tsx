"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next-nprogress-bar";

function GoHome(): React.ReactNode {
  const t = useTranslations("PageNotFound");

  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="contained"
      size="large"
      startIcon={<ArrowBackIcon />}
      sx={{ mt: 3 }}
    >
      {t("back")}
    </Button>
  );
}

export default GoHome;
