"use client";

import { notify } from "@/libs/notify";
import { authService } from "@/services";
import type { THandleChangeI, THandleSubmit } from "@/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { useRouter } from "next-nprogress-bar";
import NextLink from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";

function FormSignin(): React.ReactNode {
  const t = useTranslations("PageSignin");

  const formDataInitialState = {
    username: "",
    password: "",
    passwordVisible: false,
    terms: false,
  };
  const [formData, setFormData] = useState(formDataInitialState);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(authService.doSignIn, {
    onSuccess(data) {
      const callbackUrl = new URL(data?.url || "").searchParams.get(
        "callbackUrl"
      );

      router.push(callbackUrl || "/ITFIP-Rectory/home");
      router.refresh();
      notify("Welcome to ITFIP-Rectory", {
        type: "success",
        position: "top-center",
      });
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });

      if (error instanceof Error) {
        notify(error.message, { type: "error" });
      }
    },
  });

  const handleClickTogglePassword = () => {
    setFormData({
      ...formData,
      passwordVisible: !formData.passwordVisible,
    });
  };

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password,
    };

    mutate(payload);
  };

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="username"
        label={t("username")}
        onChange={handleChange}
        value={formData.username}
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 5, maxLength: 30 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography>{"@itfip.edu.co"}</Typography>
            </InputAdornment>
          ),
        }}
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label={t("password")}
        type={formData.passwordVisible ? "text" : "password"}
        onChange={handleChange}
        value={formData.password}
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 8, maxLength: 30 }}
        InputProps={{
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

      <FormControlLabel
        control={
          <Checkbox
            name="terms"
            onChange={() =>
              setFormData({
                ...formData,
                terms: !formData.terms,
              })
            }
            checked={formData.terms}
          />
        }
        label={
          <Typography variant="body2">
            {t("terms1")}
            <b>{" ITFIP "}</b>
            {t("terms2")}
            <Link
              variant="body2"
              component={NextLink}
              target="_blank"
              href="https://itfip.edu.co/politicas-de-tratamiento-de-los-datos-personales"
            >
              {t("terms3")}
            </Link>
          </Typography>
        }
      />

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 3, mb: 2 }}
        loading={isLoading}
        disabled={!formData.terms}
      >
        {t("submit")}
      </LoadingButton>

      <Grid container>
        <Grid item xs>
          <Link component={NextLink} href="/recover-password" variant="body2">
            {t("forgot")}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormSignin;
