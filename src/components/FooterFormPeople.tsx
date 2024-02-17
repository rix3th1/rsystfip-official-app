"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next-nprogress-bar";

interface IProps {
  isEdit: boolean;
  isLoading: boolean;
}

function FooterFormPeople({ isEdit, isLoading }: IProps): React.ReactNode {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button type="button" onClick={() => router.back()} sx={{ mt: 3, ml: 1 }}>
        {"Back"}
      </Button>

      <LoadingButton
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        sx={{ mt: 3, ml: 1 }}
      >
        {isEdit ? "Update" : "Register"}
      </LoadingButton>
    </Box>
  );
}

export default FooterFormPeople;
