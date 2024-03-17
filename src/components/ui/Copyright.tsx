import Typography, { type TypographyOwnProps } from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";

async function Copyright(
  props: TypographyOwnProps
): Promise<React.ReactElement> {
  const t = await getTranslations("PageSignin");

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {t("copyright")}
      {" © RSystfip "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
