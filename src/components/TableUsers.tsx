"use client";

import type { IUserBase } from "@/interfaces";
import { notify } from "@/libs/notify";
import { createColumn } from "@/libs/utils";
import { setUsers, type User } from "@/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userService } from "@/services";
import { Delete as DeleteIcon, Key as KeyIcon } from "@mui/icons-material";
import { CircularProgress, IconButton, Paper } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridValueGetterParams,
} from "@mui/x-data-grid";
import { isAxiosError } from "axios";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

function TableUsers(): React.ReactNode {
  const [loadingButtons, setLoadingButtons] = useState<Set<number>>(new Set());

  const dispatch = useAppDispatch();

  const usersState: Array<User> = useAppSelector(({ users }) => users.users);

  const mutationDeleteUser = useMutation(userService.deleteUser);

  const handleClick = async (roleId: IUserBase["id"]) => {
    if (!confirm("Seguro(a) de eliminar ese usuario?")) return;

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
      ...createColumn("email", "Institutional ITFIP Email", 700),
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: ({ row: { email, role_name } }: GridValueGetterParams) =>
        `${email} (${role_name[0].toUpperCase().concat(role_name.slice(1))})`,
    },
    {
      ...createColumn("actions", "Actions", 150),
      align: "center",
      renderCell: ({ row: { id, email } }) => (
        <>
          <IconButton
            component={NextLink}
            href={`/ITFIP-Rectory/users/change-password/${id}`}
            title={`Change password for user ${email}`}
          >
            <KeyIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleClick(id)}
            disabled={id === 3}
            title={`Delete user ${email} (Requires confirmation)`}
          >
            {loadingButtons.has(id) ? (
              <CircularProgress size={24} />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
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
      </Paper>
    </div>
  );
}

export default TableUsers;
