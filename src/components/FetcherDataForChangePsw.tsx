"use client";

import type { IUserBase } from "@/interfaces";
import { notify } from "@/libs/notify";
import { setTempDataForChangePsw } from "@/redux/features/temp/tempSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userService } from "@/services";
import { Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import FormChangePsw from "./FormChangePsw";

function FetcherDataForChangePsw(): React.ReactNode {
  const { role } = useParams<{ role: string }>();

  const dispatch = useAppDispatch();

  const tempDataStateForChangePsw: IUserBase = useAppSelector(
    ({ temp }) => temp.tempDataForChangePsw
  );

  const { data, error } = useQuery<any, any>(["userData", role], () =>
    userService.getData(role!)
  );

  useEffect(() => {
    if (data) dispatch(setTempDataForChangePsw(data));
    if (error) notify(error.response.data.error, { type: "error" });
  }, [data, error]);

  return (
    <>
      <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={6}>
        <Typography component="h1" variant="h5" gutterBottom align="center">
          {tempDataStateForChangePsw.email}
        </Typography>

        <FormChangePsw userId={tempDataStateForChangePsw.id} />
      </Paper>
    </>
  );
}

export default FetcherDataForChangePsw;
