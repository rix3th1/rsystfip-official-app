"use client";

import Typography, { type TypographyOwnProps } from "@mui/material/Typography";
import { useTranslations } from "next-intl";

function RectoryAddress(props: TypographyOwnProps): React.ReactNode {
  const t = useTranslations("PageSignin");

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {t.rich("address", {
        strong: (chunks) => <strong>{chunks}</strong>,
      })}
    </Typography>
  );
}

export default RectoryAddress;
