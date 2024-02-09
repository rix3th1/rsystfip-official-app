"use client";

import { notify } from "@/libs/notify";
import { createColumn } from "@/libs/utils";
import { setPeople, type People } from "@/redux/features/people/peopleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { peopleService } from "@/services";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Paper } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridValueGetterParams,
} from "@mui/x-data-grid";
import NextLink from "next/link";
import { useEffect } from "react";
import { useQuery } from "react-query";

const columns: GridColDef[] = [
  createColumn("id", "ID", 85),
  {
    ...createColumn("full_name", "Full name", 250),
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.first_name || ""} ${params.row.last_name || ""}`,
  },
  {
    ...createColumn("identification", "Identification", 140),
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.document_name || ""} ${params.row.document_number || ""}`,
  },
  createColumn("category_name", "Category", 130),
  createColumn("faculty_name", "Faculty Name", 300),
  createColumn("visit_subject", "Visit Subject", 530),
  {
    ...createColumn("actions", "Actions", 120),
    align: "center",
    renderCell: (params) => (
      <IconButton
        component={NextLink}
        href={`/history/general/update/${params.row.id}`}
        title={`Edit data for ${params.row.full_name}`}
      >
        <EditIcon />
      </IconButton>
    ),
  },
];

function TableHistoryPeople(): React.ReactNode {
  const peopleState: Array<People> = useAppSelector(
    ({ people }) => people.people
  );

  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useQuery<[], any>(
    "people",
    peopleService.getPeople
  );

  useEffect(() => {
    if (data) dispatch(setPeople(data));
    if (error) notify(error.response.data.error, { type: "error" });
  }, [data, error]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper>
        <DataGrid
          rows={peopleState}
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

export default TableHistoryPeople;
