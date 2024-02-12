"use client";

import type { THandleClick } from "@/types";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button } from "@mui/material";
import { useRouter } from "next-nprogress-bar";

interface IProps {
  isEdit: boolean;
  isLoading: boolean;
}

function FooterFormPeople({ isEdit, isLoading }: IProps): React.ReactNode {
  const router = useRouter();

  const handleClick = (e: THandleClick) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button onClick={handleClick} sx={{ mt: 3, ml: 1 }}>
        Back
      </Button>

      <LoadingButton
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        sx={{ mt: 3, ml: 1 }}
      >
        {isEdit ? "Actualizar" : "Registrar"}
      </LoadingButton>
    </Box>
  );
}

export default FooterFormPeople;
