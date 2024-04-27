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
import { useTranslations } from "next-intl";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import { Loader, PasswordMeter, ProtectedElement } from "./ui";

function FormChangePswForget(): React.ReactNode {
  const t = useTranslations("PageLinkRecoveryPsw");

  const formDataInitialState = {
    password: "",
    password2: "",
    passwordVisible: false,
  };
  const [formData, setFormData] = useState(formDataInitialState);
  const [hasChanged, setHasChanged] = useState(false);

  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  const router = useRouter();

  const goBack = () => {
    window.length > 1 ? router.back() : router.push("/");
  };

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
      <ProtectedElement isAllowed={isLoading}>
        <Loader />
      </ProtectedElement>

      <TextField
        margin="normal"
        fullWidth
        name="password"
        label={t("input1")}
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
        label={t("input2")}
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
        <Button type="button" onClick={goBack} sx={{ mt: 3, ml: 1 }}>
          {t("back")}
        </Button>

        <ProtectedElement isAllowed={!hasChanged}>
          <LoadingButton
            type="submit"
            loading={isLoading}
            sx={{ mt: 3, ml: 1 }}
          >
            {t("submit")}
          </LoadingButton>
        </ProtectedElement>

        <ProtectedElement isAllowed={hasChanged}>
          <Button
            type="button"
            onClick={() => signOut({ callbackUrl: "/signin" })}
            sx={{ mt: 3, ml: 1 }}
          >
            {t("signin")}
          </Button>
        </ProtectedElement>
      </Box>
    </Box>
  );
}

export default FormChangePswForget;
