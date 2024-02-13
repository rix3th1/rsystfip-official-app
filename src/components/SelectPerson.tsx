"use client";

import type { ICategory } from "@/interfaces";
import { notify } from "@/libs/notify";
import {
  setDeans,
  setFormData,
  type FormDataState,
} from "@/redux/features/appointments/appointmentsSlice";
import { setCategories } from "@/redux/features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { categoryService, deanService } from "@/services";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useEffect, type DependencyList } from "react";
import { useQueries, type UseQueryResult } from "react-query";
import { actionFormSchedule } from ".";

interface IProps {
  action: actionFormSchedule;
  handleChange: (e: SelectChangeEvent) => void;
  facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

function SelectPerson({
  action,
  handleChange,
  facultieSelectRef,
}: IProps): React.ReactNode {
  const categoriesState: Array<ICategory> = useAppSelector(
    ({ resources }) => resources.categories
  );
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ appointments: { formData } }) => formData[action]
  );

  const dispatch = useAppDispatch();

  const queries = useQueries([
    { queryKey: "deans", queryFn: deanService.getDeans },
    {
      queryKey: "categories",
      queryFn: categoryService.getCategories,
      enabled: false,
    },
  ]);

  useEffect(() => {
    for (let i = 0; i < queries.length; i++) {
      const { data, error } = queries[i] as UseQueryResult<any, any>;

      if (data) {
        if (i === 0) {
          dispatch(setDeans(data));
        } else if (i === 1) {
          dispatch(setCategories(data));
        }
      }

      if (error) {
        notify(error.response.data.error, { type: "error" });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, queries.flatMap(({ data, error }) => [data, error]) as DependencyList);

  const inputsInteraction = async () => {
    if (!formDataState.category_id) return;

    dispatch(
      setFormData([
        action,
        {
          ...formDataState,
          disabledAll: false,
          disabledAfterAutocomplete: false,
        },
      ])
    );

    if (formDataState.category_id === "4") {
      await queries[0].refetch();
    }

    if (facultieSelectRef.current) {
      facultieSelectRef.current.className = "form-select border-0 bg-white";
      facultieSelectRef.current.disabled = false;
      if (formDataState.category_id === "5")
        facultieSelectRef.current.disabled = true;
    }
  };

  useEffect(() => {
    inputsInteraction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDataState.category_id]);

  return (
    <FormControl fullWidth sx={{ minWidth: 120, mt: 1 }}>
      <InputLabel>Category</InputLabel>

      <Select
        name="category_id"
        label="Category"
        value={formDataState.category_id}
        onChange={handleChange}
        onOpen={() => {
          categoriesState.length === 0 && queries[1].refetch();
        }}
        startAdornment={
          queries[1].isLoading && (
            <InputAdornment position="start">
              <CircularProgress color="inherit" size={20} />
            </InputAdornment>
          )
        }
        required
      >
        <MenuItem value="">
          <em>No seleccionado</em>
        </MenuItem>
        {categoriesState.map(({ id, category_name }) => (
          <MenuItem key={crypto.randomUUID()} value={id.toString()}>
            {category_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectPerson;
