"use client";

import type { IResourceFacultie } from "@/interfaces";
import { notify } from "@/libs/notify";
import type { FormDataState } from "@/redux/features/appointments/appointmentsSlice";
import { setFaculties } from "@/redux/features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { facultieService } from "@/services";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { actionFormSchedule } from ".";

interface IProps {
  action: actionFormSchedule;
  handleChange: (e: SelectChangeEvent) => void;
  facultieSelectRef: React.RefObject<HTMLSelectElement>;
}

function SelectFaculties({
  action,
  handleChange,
  facultieSelectRef,
}: IProps): React.ReactNode {
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ appointments: { formData } }) => formData[action]
  );
  const facultiesState: Array<IResourceFacultie> = useAppSelector(
    ({ resources }) => resources.faculties
  );

  const dispatch = useAppDispatch();

  const { data, error, isLoading, refetch } = useQuery<[], any>(
    "faculties",
    facultieService.getFaculties,
    { enabled: false }
  );

  useEffect(() => {
    if (data) dispatch(setFaculties(data));
    if (error) notify(error.response.data.error, { type: "error" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <FormControl fullWidth sx={{ minWidth: 120, mt: 1 }}>
      <InputLabel>Faculty</InputLabel>

      <Select
        name="faculty_id"
        label="Faculty"
        value={formDataState.faculty_id}
        onChange={handleChange}
        onOpen={() => {
          facultiesState.length === 0 && refetch();
        }}
        startAdornment={
          isLoading && (
            <InputAdornment position="start">
              <CircularProgress color="inherit" size={20} />
            </InputAdornment>
          )
        }
        ref={facultieSelectRef}
        disabled={
          formDataState.disabledAll || formDataState.disabledAfterAutocomplete
        }
        required
      >
        <MenuItem value="">
          <em>No seleccionado</em>
        </MenuItem>
        {facultiesState.map(({ id, faculty_name }) => (
          <MenuItem key={crypto.randomUUID()} value={id.toString()}>
            {faculty_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectFaculties;
