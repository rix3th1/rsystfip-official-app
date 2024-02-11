"use client";

import { notify } from "@/libs/notify";
import { authService } from "@/services";
import type { THandleChangeI, THandleSubmit } from "@/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import NextLink from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import { Copyright } from "./ui";

function FormSignin() {
  const formDataInitialState = {
    username: "",
    password: "",
    passwordVisible: false,
    terms: true,
  };
  const [formData, setFormData] = useState(formDataInitialState);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(authService.auth, {
    onSuccess() {
      router.push("/ITFIP-Rectory/home");
      router.refresh();
    },
    onError(error: any) {
      notify(error.response.data.error, { type: "error" });
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
        label="Username"
        onChange={handleChange}
        value={formData.username}
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 5, maxLength: 30 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography>@itfip.edu.co</Typography>
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
        label="Password"
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
            color="primary"
            onChange={() =>
              setFormData({
                ...formData,
                terms: !formData.terms,
              })
            }
            checked={formData.terms}
          />
        }
        label="I accept the terms and conditions"
      />

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        loading={isLoading}
        disabled={!formData.terms}
      >
        Sign In
      </LoadingButton>

      <Grid container>
        <Grid item xs>
          <Link component={NextLink} href="/recover-password" variant="body2">
            {"Forgot password?"}
          </Link>
        </Grid>
      </Grid>

      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}

export default FormSignin;
