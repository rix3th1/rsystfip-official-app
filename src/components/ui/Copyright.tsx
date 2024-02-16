import Link from "@mui/material/Link";
import Typography, { type TypographyOwnProps } from "@mui/material/Typography";

function Copyright(props: TypographyOwnProps): React.ReactNode {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" target="_blank" href="https://itfip.edu.co">
        {"RSystfip"}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
