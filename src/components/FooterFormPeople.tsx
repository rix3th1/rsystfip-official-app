"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next-nprogress-bar";

interface IProps {
  isEdit: boolean;
  isLoading: boolean;
}

function FooterFormPeople({ isEdit, isLoading }: IProps): React.ReactNode {
  const t = useTranslations("FormSchedulePeople");

  const router = useRouter();

  const goBack = () => {
    window.length > 1 ? router.back() : router.push("/");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button type="button" onClick={goBack} sx={{ mt: 3, ml: 1 }}>
        {t("back")}
      </Button>

      <LoadingButton
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        sx={{ mt: 3, ml: 1 }}
      >
        {t(isEdit ? "update" : "submit")}
      </LoadingButton>
    </Box>
  );
}

export default FooterFormPeople;
