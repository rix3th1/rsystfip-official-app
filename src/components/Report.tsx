"use client";

import type { ICategory } from "@/interfaces";
import { notify } from "@/libs/notify";
import {
  setQueryData,
  setReports,
  setReportsOrigen,
  type QueryData,
  type Reports,
} from "@/redux/features/reports/reportsSlice";
import { setCategories } from "@/redux/features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { categoryService, reportService } from "@/services";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format, parse } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, type DependencyList } from "react";
import { useQueries, type UseQueryResult } from "react-query";
import FetcherReports from "./FetcherReports";
import TableReports from "./TableReports";

function Report(): React.ReactNode {
  const t = useTranslations("PageReportsPeople");

  const dispatch = useAppDispatch();

  const categoriesState: Array<ICategory> = useAppSelector(
    ({ resources }) => resources.categories
  );
  const queryDataState: QueryData = useAppSelector(
    ({ reports }) => reports.queryData
  );
  const reportsOrigenState: Array<Reports> = useAppSelector(
    ({ reports }) => reports.reportsOrigen
  );

  const handleChangeSelect = (e: SelectChangeEvent) => {
    dispatch(
      setQueryData({
        ...queryDataState,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChangeDatePicker = (name: string, value: Date) => {
    dispatch(
      setQueryData({
        ...queryDataState,
        [name]: format(value, "yyyy-MM-dd"),
      })
    );
  };

  const queries = useQueries([
    {
      queryKey: "categories",
      queryFn: categoryService.getCategories,
      enabled: false,
    },
    {
      queryKey: ["reports", queryDataState.start_time, queryDataState.end_time],
      queryFn: () => reportService.getReports(queryDataState),
    },
  ]);

  const filterReports = (dataToFilter = reportsOrigenState) => {
    dispatch(
      setReports(
        queryDataState.category_id
          ? dataToFilter.filter(
              ({ category_id }) =>
                category_id.toString() === queryDataState.category_id.toString()
            )
          : dataToFilter
      )
    );
  };

  useEffect(() => {
    for (let i = 0; i < queries.length; i++) {
      const { data, error } = queries[i] as UseQueryResult<any, any>;

      if (data) {
        if (i === 0) {
          dispatch(setCategories(data));
        }
        if (i === 1) {
          filterReports(data);
          dispatch(setReportsOrigen(data));
        }
      }

      if (error) {
        notify(error.response.data.error, { type: "error" });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, queries.flatMap(({ data, error }) => [data, error]) as DependencyList);

  useEffect(() => {
    filterReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDataState.category_id]);

  return (
    <>
      <Grid
        container
        spacing={2}
        marginY={{ xs: "1rem", sm: "2rem", md: "3rem" }}
        alignItems="center"
      >
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={t("start")}
              value={parse(queryDataState.start_time, "yyyy-MM-dd", new Date())}
              onChange={(value) => {
                handleChangeDatePicker("start_time", value!);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={t("end")}
              value={parse(queryDataState.end_time, "yyyy-MM-dd", new Date())}
              onChange={(value) => {
                handleChangeDatePicker("end_time", value!);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>{t("category")}</InputLabel>

            <Select
              name="category_id"
              label={t("category")}
              value={queryDataState.category_id}
              onChange={handleChangeSelect}
              onOpen={() => {
                categoriesState.length === 0 && queries[0].refetch();
              }}
              startAdornment={
                queries[0].isLoading && (
                  <InputAdornment position="start">
                    <CircularProgress color="inherit" size={20} />
                  </InputAdornment>
                )
              }
              autoFocus
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {categoriesState.map(({ id, category_name }) => (
                <MenuItem key={crypto.randomUUID()} value={id}>
                  {category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <FetcherReports />

      <TableReports isLoading={queries[1].isLoading} />
    </>
  );
}

export default Report;
