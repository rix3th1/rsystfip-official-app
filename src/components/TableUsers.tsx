"use client";

import type { IUserBase } from "@/interfaces";
import { notify } from "@/libs/notify";
import { createColumn } from "@/libs/utils";
import { setUsers, type User } from "@/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userService } from "@/services";
import { Delete as DeleteIcon, Key as KeyIcon } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  type GridColDef,
  type GridValueGetterParams,
} from "@mui/x-data-grid";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

function TableUsers(): React.ReactNode {
  const t = useTranslations("PageUsers");

  const [loadingButtons, setLoadingButtons] = useState<Set<number>>(new Set());

  const dispatch = useAppDispatch();

  const usersState: Array<User> = useAppSelector(({ users }) => users.users);

  const mutationDeleteUser = useMutation(userService.deleteUser);

  const handleClick = async (roleId: IUserBase["id"]) => {
    if (!confirm("Are you sure you want to delete it?")) return;

    setLoadingButtons((prevSet) => new Set(prevSet).add(+roleId));

    try {
      const data = await mutationDeleteUser.mutateAsync(+roleId);

      const updatedRows = usersState.filter((row) => row.id !== roleId);

      dispatch(setUsers(updatedRows));

      notify(data.ok, { type: "success", position: "top-left" });
    } catch (error) {
      if (isAxiosError(error)) {
        notify(error.response?.data.error, { type: "error" });
      }
    }
  };

  const columns: GridColDef[] = [
    {
      ...createColumn("email", t("row1"), 700),
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: ({ row: { email, role_name } }: GridValueGetterParams) =>
        `${email} (${role_name[0].toUpperCase().concat(role_name.slice(1))})`,
    },
    {
      ...createColumn("actions", t("row2"), 150),
      align: "center",
      renderCell: ({ row: { id, email, role_name } }): React.ReactNode => (
        <>
          <Tooltip title={t("changepsw", { email })}>
            <IconButton
              component={NextLink}
              href={`/ITFIP-Rectory/users/change-password/${id}`}
            >
              <KeyIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={t("delete", { role_name, email })}>
            <IconButton
              color="error"
              onClick={() => handleClick(id)}
              disabled={id === 3}
            >
              {loadingButtons.has(id) ? (
                <CircularProgress size={24} />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const { data, error, isLoading } = useQuery<[], any>(
    "users",
    userService.getUsers
  );

  useEffect(() => {
    if (data) dispatch(setUsers(data));
    if (error) notify(error.response.data.error, { type: "error" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper>
        {isLoading ? (
          <LinearProgress sx={{ my: 5 }} />
        ) : (
          <DataGrid
            rows={usersState}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            loading={isLoading}
            sx={{ border: "none" }}
          />
        )}
      </Paper>
    </div>
  );
}

export default TableUsers;
