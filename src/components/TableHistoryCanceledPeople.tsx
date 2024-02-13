"use client";

import { notify } from "@/libs/notify";
import { createColumn } from "@/libs/utils";
import {
  setCancelledPeople,
  type PeopleCancellation,
} from "@/redux/features/cancellations/cancellationsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { peopleService } from "@/services";
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  type GridColDef,
  type GridValueGetterParams,
} from "@mui/x-data-grid";
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
    ...createColumn("identification", "Identification", 170),
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.document_name || ""} ${params.row.document_number || ""}`,
  },
  createColumn("category_name", "Category", 130),
  createColumn("faculty_name", "Faculty Name", 350),
  createColumn("cancellation_subject", "Cancellation Subject", 450),
];

function TableHistoryCanceledPeople(): React.ReactNode {
  const dispatch = useAppDispatch();

  const cancelledPeopleState: Array<PeopleCancellation> = useAppSelector(
    ({ cancellation }) => cancellation
  );

  const { data, error, isLoading } = useQuery<[], any>(
    "peopleCancelled",
    peopleService.getPeopleCancelled
  );

  useEffect(() => {
    if (data) dispatch(setCancelledPeople(data));
    if (error) notify(error.response.data.error, { type: "error" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper>
        <DataGrid
          rows={cancelledPeopleState}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
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

export default TableHistoryCanceledPeople;
