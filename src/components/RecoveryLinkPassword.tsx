"use client";

import { notify } from "@/libs/notify";
import { accountService } from "@/services";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import FormChangePswForget from "./FormChangePswForget";
import ResetTokenInvalid from "./ResetTokenInvalid";
import { Loader } from "./ui";

function RecoveryLinkPassword(): React.ReactNode {
  const params = useParams<{ resetToken: string }>();

  const [dataUserVerified, setDataUserVerified] = useState({
    tokenIsValid: false,
    email: "",
  });

  const { data, isLoading, error } = useQuery<any, any>(
    "verifyJwtForRecoverPsw",
    () => accountService.verifyJwtForRecoverPsw(params.resetToken),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (data) setDataUserVerified(data);
    if (error) notify(error.response.data.error, { type: "error" });
  }, [data, error]);

  return (
    <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
      <Typography component="h1" variant="h5" gutterBottom align="center">
        {isLoading ? <LinearProgress sx={{ mt: 1 }} /> : dataUserVerified.email}
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
  );
}

export default RecoveryLinkPassword;
