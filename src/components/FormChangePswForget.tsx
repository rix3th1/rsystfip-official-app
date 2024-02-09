"use client";

import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { notify } from "@/libs/notify";
import { accountService } from "@/services";
import type { THandleChangeI, THandleSubmit } from "@/types";
import { PasswordMeter } from "./ui";

function FormChangePswForget(): React.ReactNode {
  const formDataInitialState = {
    password: "",
    password2: "",
    passwordVisible: false,
  };
  const [formData, setFormData] = useState(formDataInitialState);
  const { resetToken } = useParams<{ resetToken: string }>();

  const { mutate, isLoading } = useMutation(
    accountService.changePasswordWithJwt,
    {
      onSuccess(data) {
        notify(data.ok, {
          type: "success",
          position: "top-left",
        });

        setFormData(formDataInitialState);
      },
      onError(error: any) {
        notify(error.response.data.error, { type: "error" });
      },
    }
  );

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = {
      resetToken,
      password: formData.password,
      password2: formData.password2,
    };

    mutate(payload);
  };

  const handleClickTogglePassword = () => {
    setFormData({
      ...formData,
      passwordVisible: !formData.passwordVisible,
    });
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
        name="password"
        label="New password"
        onChange={handleChange}
        value={formData.password}
        type={formData.passwordVisible ? "text" : "password"}
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 8, maxLength: 30 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickTogglePassword}>
                {formData.passwordVisible ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <PasswordMeter
        valueLength={formData.password.length}
        LinearProgressProps={{
          variant: "determinate",
        }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password2"
        label="Confirm password"
        onChange={handleChange}
        value={formData.password2}
        type={formData.passwordVisible ? "text" : "password"}
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 8, maxLength: 30 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickTogglePassword}>
                {formData.passwordVisible ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <PasswordMeter
        valueLength={formData.password2.length}
        LinearProgressProps={{
          variant: "determinate",
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton type="submit" loading={isLoading} sx={{ mt: 3, ml: 1 }}>
          Continue
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default FormChangePswForget;
