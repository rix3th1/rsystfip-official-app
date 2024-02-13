import { GoHome } from "@/components/ui";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { type Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "RSystfip | Not found",
};

function PageNotFound(): React.ReactNode {
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
            src={"/rsystfip_logotype.svg"}
            alt="RSystfip logotype"
            width={72}
            height={57}
            priority
          />
        </Box>

        <Typography component="h1" variant="h3" gutterBottom>
          {"Error 404"}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {"Oops! The page you're looking for doesn't exist."}
        </Typography>

        <GoHome />
      </Box>
    </Container>
  );
}

export default PageNotFound;
