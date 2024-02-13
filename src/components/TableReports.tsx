"use client";

import { createColumn } from "@/libs/utils";
import type { Reports } from "@/redux/features/reports/reportsSlice";
import { useAppSelector } from "@/redux/hooks";
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  type GridColDef,
  type GridValueGetterParams,
} from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface IProps {
  isLoading: boolean;
}

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
    ...createColumn("created_at", "Created at", 200),
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      format(parseISO(params.row.created_at), "MMM d, yyyy 'a las' h:mm a", {
        locale: es,
      }),
  },
  {
    ...createColumn("updated_at", "Updated at", 200),
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      format(parseISO(params.row.updated_at), "MMM d, yyyy 'a las' h:mm a", {
        locale: es,
      }),
  },
  {
    ...createColumn("appointment_date", "Appointment date", 380),
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${format(parseISO(params.row.start_time), "MMM d, yyyy 'a las' h:mm a", {
        locale: es,
      })}${" - "}
    ${format(parseISO(params.row.start_time), "MMM d, yyyy 'a las' h:mm a", {
      locale: es,
    })}`,
  },
  createColumn("scheduling_count", "Scheduling count", 180),
  createColumn("daily_count", "Daily count", 180),
  createColumn("category_name", "Category name", 170),
];

function TableReports({ isLoading }: IProps): React.ReactNode {
  const reportsState: Array<Reports> = useAppSelector(
    ({ reports }) => reports.reports
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper>
        <DataGrid
          rows={reportsState}
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

export default TableReports;
