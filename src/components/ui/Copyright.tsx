import Typography, { type TypographyOwnProps } from "@mui/material/Typography";
import { useTranslations } from "next-intl";

function Copyright(props: TypographyOwnProps): React.ReactNode {
  const t = useTranslations("PageSignin");

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
