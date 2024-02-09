"use client";

import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { notify } from "@/libs/notify";
import { accountService } from "@/services";
import FormChangePswForget from "./FormChangePswForget";
import ResetTokenInvalid from "./ResetTokenInvalid";
import { Loader } from "./ui";

function RecoveryLinkPassword(): React.ReactNode {
  const { resetToken } = useParams<{ resetToken: string }>();

  const [dataUserVerified, setDataUserVerified] = useState({
    tokenIsValid: false,
    email: "",
  });

  const { data, isLoading, error } = useQuery<any, any>(
    "verifyJwtForRecoverPsw",
    () => accountService.verifyJwtForRecoverPsw(resetToken!),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data) setDataUserVerified(data);
    if (error) notify(error.response.data.error, { type: "error" });
  }, [data, error]);

  return (
    <>
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
        <Typography component="h1" variant="h5" gutterBottom align="center">
          {dataUserVerified.email}
        </Typography>

        {!isLoading ? (
          dataUserVerified.tokenIsValid ? (
            <FormChangePswForget />
          ) : (
            <ResetTokenInvalid />
          )
        ) : (
          <Loader />
        )}
      </Paper>
    </>
  );
}

export default RecoveryLinkPassword;
