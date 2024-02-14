"use client";

import type { IDocument } from "@/interfaces";
import { notify } from "@/libs/notify";
import { setDocuments } from "@/redux/features/resources/resourcesSlice";
import {
  resetFormDataAdmin,
  setFormData,
  setTemps,
  type FormData,
  type Temps,
} from "@/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { documentService, userService } from "@/services";
import type { THandleChangeITS, THandleClick, THandleSubmit } from "@/types";
import roleItems from "@/utils/roleItems.json";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { isAxiosError } from "axios";
import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { PasswordMeter } from "./ui";

function FormUserAdd(): React.ReactNode {
  const formDataState: FormData = useAppSelector(({ users }) => users.formData);
  const tempsData: Temps = useAppSelector(({ users }) => users.temps);
  const documentsState: Array<IDocument> = useAppSelector(
    ({ resources }) => resources.documents
  );

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleClickTogglePassword = () => {
    dispatch(
      setTemps({
        ...tempsData,
        passwordVisible: !tempsData.passwordVisible,
      })
    );
  };

  const handleChange = (e: THandleChangeITS | SelectChangeEvent) => {
    dispatch(
      setFormData({
        ...formDataState,
        [e.target.name]: e.target.value,
      })
    );
  };

  const mutationSaveUser = useMutation(userService.saveUser, {
    onSuccess(data) {
      notify(data.ok, {
        type: "success",
        position: "top-left",
      });

      dispatch(resetFormDataAdmin());
    },
    onError(error) {
      if (isAxiosError(error)) {
        notify(error.response?.data.error, { type: "error" });
      }
    },
  });

  const handleClick = (e: THandleClick) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();
    const payload = formDataState;
    mutationSaveUser.mutate(payload);
  };

  const { data, error, isLoading, refetch } = useQuery<[], any>(
    "documents",
    documentService.getDocuments,
    { enabled: false }
  );

  useEffect(() => {
    if (data) dispatch(setDocuments(data));
    if (error) notify(error.response.data.error, { type: "error" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={4}>
          <FormControl fullWidth sx={{ minWidth: 120, mt: 1 }}>
            <InputLabel>Role</InputLabel>

            <Select
              name="role_id"
              label="Role"
              value={formDataState.role_id}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>No seleccionado</em>
              </MenuItem>
              {roleItems.map(({ id, role_name }) => (
                <MenuItem key={crypto.randomUUID()} value={id}>
                  {role_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={4}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="first_name"
            label="First name"
            onChange={handleChange}
            value={formDataState.first_name}
            type="text"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 3, maxLength: 25 }}
            autoFocus
          />
        </Grid>

        <Grid item md={4}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="last_name"
            label="Last name"
            onChange={handleChange}
            value={formDataState.last_name}
            type="text"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 3, maxLength: 25 }}
          />
        </Grid>

        <Grid item md={6}>
          <FormControl fullWidth sx={{ minWidth: 120, mt: 1 }}>
            <InputLabel>Document</InputLabel>

            <Select
              name="document_id"
              label="Document"
              value={formDataState.document_id}
              onChange={handleChange}
              onOpen={() => {
                documentsState.length === 0 && refetch();
              }}
              startAdornment={
                isLoading && (
                  <InputAdornment position="start">
                    <CircularProgress color="inherit" size={20} />
                  </InputAdornment>
                )
              }
            >
              <MenuItem value="">
                <em>No seleccionado</em>
              </MenuItem>
              {documentsState.map(({ id, document_description }) => (
                <MenuItem key={crypto.randomUUID()} value={id.toString()}>
                  {document_description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="document_number"
            label="Document number"
            onChange={handleChange}
            value={formDataState.document_number}
            type="text"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 8, maxLength: 10 }}
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Institutional email"
            onChange={handleChange}
            value={formDataState.email}
            type="email"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 10, maxLength: 30 }}
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone_number"
            label="Phone number"
            onChange={handleChange}
            value={formDataState.phone_number}
            type="text"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 10, maxLength: 10 }}
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={handleChange}
            value={formDataState.password}
            type={tempsData.passwordVisible ? "text" : "password"}
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
                    {tempsData.passwordVisible ? (
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
            value={formDataState.password}
            LinearProgressProps={{
              variant: "determinate",
            }}
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Password confirm"
            onChange={handleChange}
            value={formDataState.password2}
            type={tempsData.passwordVisible ? "text" : "password"}
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
                    {tempsData.passwordVisible ? (
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
            value={formDataState.password2}
            LinearProgressProps={{
              variant: "determinate",
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleClick} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <LoadingButton
          type="submit"
          loading={mutationSaveUser.isLoading}
          sx={{ mt: 3, ml: 1 }}
        >
          Registrar
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default FormUserAdd;
