"use client";

import { notify } from "@/libs/notify";
import { createColumn } from "@/libs/utils";
import { setPeople, type People } from "@/redux/features/people/peopleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { peopleService } from "@/services";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  type GridColDef,
  type GridValueGetterParams,
} from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useEffect } from "react";
import { useQuery } from "react-query";

function TableHistoryPeople(): React.ReactNode {
  const t = useTranslations("PageHistoryPeople");

  const peopleState: Array<People> = useAppSelector(
    ({ people }) => people.people
  );

  const columns: GridColDef[] = [
    createColumn("id", t("row1"), 85),
    {
      ...createColumn("full_name", t("row2"), 250),
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    {
      ...createColumn("identification", t("row3"), 140),
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.document_name || ""} ${params.row.document_number || ""}`,
    },
    createColumn("category_name", t("row4"), 130),
    createColumn("faculty_name", t("row5"), 300),
    createColumn("visit_subject", t("row6"), 530),
    {
      ...createColumn("actions", t("row7"), 120),
      align: "center",
      renderCell: ({ row: { id, first_name, last_name } }): React.ReactNode => (
        <Tooltip title={t("edit", { fullname: `${first_name} ${last_name}` })}>
          <IconButton
            component={NextLink}
            href={`/ITFIP-Rectory/history/general/update/${id}`}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useQuery<[], any>(
    "people",
    peopleService.getPeople
  );

  useEffect(() => {
    if (data) dispatch(setPeople(data));
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
        )}
      </Paper>
    </div>
  );
}

export default TableHistoryPeople;
