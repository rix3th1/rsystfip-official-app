"use client";

import { notify } from "@/libs/notify";
import { accountService } from "@/services";
import type { THandleChangeI, THandleSubmit } from "@/types";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { isAxiosError } from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import { PasswordMeter, ProtectedElement } from "./ui";

function FormChangePswForget(): React.ReactNode {
  const formDataInitialState = {
    password: "",
    password2: "",
    passwordVisible: false,
  };
  const [formData, setFormData] = useState(formDataInitialState);
  const [hasChanged, setHasChanged] = useState(false);
  const params = useParams<{ resetToken: string }>();

  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    accountService.changePasswordWithJwt,
    {
      onSuccess(data) {
        notify(data.ok, {
          type: "success",
          position: "top-left",
        });

        setFormData(formDataInitialState);
        setHasChanged(true);
      },
      onError(error) {
        if (isAxiosError(error)) {
          notify(error.response?.data.error, { type: "error" });
        }
      },
    }
  );

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = {
      resetToken: params.resetToken,
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
        autoFocus
        required
      />

      <PasswordMeter
        value={formData.password}
        LinearProgressProps={{
          variant: "determinate",
        }}
      />

      <TextField
        margin="normal"
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
        required
      />

      <PasswordMeter
        value={formData.password2}
        LinearProgressProps={{
          variant: "determinate",
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          onClick={() => router.back()}
          sx={{ mt: 3, ml: 1 }}
        >
          Back
        </Button>

        <ProtectedElement isAllowed={!hasChanged}>
          <LoadingButton
            type="submit"
            loading={isLoading}
            sx={{ mt: 3, ml: 1 }}
          >
            Continue
          </LoadingButton>
        </ProtectedElement>

        <ProtectedElement isAllowed={hasChanged}>
          <Button
            type="button"
            onClick={() => signOut({ callbackUrl: "/signin" })}
            sx={{ mt: 3, ml: 1 }}
          >
            Sign In
          </Button>
        </ProtectedElement>
      </Box>
    </Box>
  );
}

export default FormChangePswForget;
