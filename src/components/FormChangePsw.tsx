"use client";

import type { IUserBase } from "@/interfaces";
import { notify } from "@/libs/notify";
import { accountService } from "@/services";
import type { THandleChangeI, THandleClick, THandleSubmit } from "@/types";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import { PasswordMeter } from "./ui";

interface IProps {
  userId: IUserBase["id"];
}

function FormChangePsw({ userId }: IProps): React.ReactNode {
  const formDataInitialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordVisible: false,
  };
  const [formData, setFormData] = useState(formDataInitialState);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(accountService.changePassword, {
    onSuccess(data) {
      notify(data.ok, {
        type: "success",
        position: "top-left",
      });

      setFormData(formDataInitialState);
    },
    onError(error) {
      if (isAxiosError(error)) {
        notify(error.response?.data.error, { type: "error" });
      }
    },
  });

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = {
      id: userId.toString(),
      current_password: formData.currentPassword,
      new_password: formData.newPassword,
      new_password_confirm: formData.confirmPassword,
    };

    mutate(payload);
  };

  const handleClickTogglePassword = () => {
    setFormData({
      ...formData,
      passwordVisible: !formData.passwordVisible,
    });
  };

  const handleClick = (e: THandleClick) => {
    e.preventDefault();
    router.back();
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
        name="currentPassword"
        label="Current password"
        onChange={handleChange}
        value={formData.currentPassword}
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
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New password"
        onChange={handleChange}
        value={formData.newPassword}
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
        valueLength={formData.newPassword.length}
        LinearProgressProps={{
          variant: "determinate",
        }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm password"
        onChange={handleChange}
        value={formData.confirmPassword}
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
        valueLength={formData.confirmPassword.length}
        LinearProgressProps={{
          variant: "determinate",
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleClick} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <LoadingButton type="submit" loading={isLoading} sx={{ mt: 3, ml: 1 }}>
          Continue
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default FormChangePsw;
