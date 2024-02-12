"use client";

import type { IUserBase } from "@/interfaces";
import { notify } from "@/libs/notify";
import { setTempDataForChangePsw } from "@/redux/features/temp/tempSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userService } from "@/services";
import { CircularProgress, Paper, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "react-query";
import FormChangePsw from "./FormChangePsw";

function FetcherDataForChangePsw(): React.ReactNode {
  const params = useParams<{ role: string }>();

  const dispatch = useAppDispatch();

  const tempDataStateForChangePsw: IUserBase = useAppSelector(
    ({ temp }) => temp.tempDataForChangePsw
  );

  const { data, error, isLoading } = useQuery<any, any>(
    ["userData", params.role],
    () => userService.getData(params.role)
  );

  useEffect(() => {
    if (data) dispatch(setTempDataForChangePsw(data));
    if (error) notify(error.response.data.error, { type: "error" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
      <Typography component="h1" variant="h5" gutterBottom align="center">
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          tempDataStateForChangePsw.email
        )}
      </Typography>

      <FormChangePsw userId={tempDataStateForChangePsw.id} />
    </Paper>
  );
}

export default FetcherDataForChangePsw;
