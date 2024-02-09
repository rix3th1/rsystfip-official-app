"use client";

import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import MailIcon from "@mui/icons-material/Mail";
import {
  Box,
  CircularProgress,
  Fab,
  InputAdornment,
  TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { useMutation } from "react-query";
import { notify } from "@/libs/notify";
import { accountService } from "@/services";
import type { THandleChangeI, THandleSubmit } from "@/types";

function FormRecoveryPsw(): React.ReactNode {
  const formDataInitialState = { email: "" };
  const [formData, setFormData] = useState(formDataInitialState);

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    accountService.sendJwtForRecoverPsw,
    {
      onSuccess() {
        notify(
          `We will send you an email with instructions to reset your password. The link sended expires in 3 minutes.`,
          { type: "success" }
        );

        setFormData(formDataInitialState);
      },
      onError(error: any) {
        notify(error.response.data.error, { type: "error" });
      },
    }
  );

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();
    const payload = formData;
    mutate(payload.email);
  };

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        placeholder="Mail@itfip.edu.co"
        onChange={handleChange}
        value={formData.email}
        type="email"
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 10, maxLength: 30 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon sx={{ mx: 2 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ my: 5 }}>
              <Box sx={{ position: "relative" }}>
                <Fab
                  color={`${
                    isSuccess ? "success" : isError ? "error" : "primary"
                  }`}
                  type="submit"
                >
                  {isSuccess ? (
                    <CheckIcon />
                  ) : isError ? (
                    <ErrorIcon />
                  ) : (
                    <MailIcon />
                  )}
                </Fab>

                {isLoading && (
                  <CircularProgress
                    size={68}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: -6,
                      left: -6,
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
            </InputAdornment>
          ),
        }}
        autoFocus
      />
    </Box>
  );
}

export default FormRecoveryPsw;
