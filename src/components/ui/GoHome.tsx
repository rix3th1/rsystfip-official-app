"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useRouter } from "next-nprogress-bar";

function GoHome(): React.ReactNode {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="contained"
      size="large"
      startIcon={<ArrowBackIcon />}
      sx={{ mt: 3 }}
    >
      Go Back
    </Button>
  );
}

export default GoHome;
