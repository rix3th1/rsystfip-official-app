import { Box, Container, Typography } from "@mui/material";
import { GoHome } from "./ui";

function ResetTokenInvalid(): React.ReactNode {
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
        <Box
          component="img"
          src={"/rsystfip_logotype.svg"}
          alt="RSystfip logotype"
          width={72}
          height={57}
          sx={{ mb: 4 }}
        />
        <Typography component="h1" variant="h3" gutterBottom>
          Invalid Link
        </Typography>

        <Typography variant="body1" gutterBottom>
          The link to change your password is invalid!
        </Typography>

        <GoHome />
      </Box>
    </Container>
  );
}

export default ResetTokenInvalid;
