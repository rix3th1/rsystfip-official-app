import { Link, Typography } from "@mui/material";

function Copyright(props: any): React.ReactNode {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://itfip.edu.co/">
        RSystfip
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
