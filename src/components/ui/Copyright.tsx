import Typography, { type TypographyOwnProps } from "@mui/material/Typography";

function Copyright(props: TypographyOwnProps): React.ReactNode {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © RSystfip "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
