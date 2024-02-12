"use client";

import type { IDocument } from "@/interfaces";
import { notify } from "@/libs/notify";
import type { FormDataState } from "@/redux/features/appointments/appointmentsSlice";
import { setDocuments } from "@/redux/features/resources/resourcesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { documentService } from "@/services";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { actionFormSchedule } from ".";

interface IProps {
  action: actionFormSchedule;
  handleChange: (e: SelectChangeEvent) => void;
}

function SelectDocument({ action, handleChange }: IProps): React.ReactNode {
  const documentsState: Array<IDocument> = useAppSelector(
    ({ resources }) => resources.documents
  );
  const formDataState: FormDataState | undefined = useAppSelector(
    ({ appointments: { formData } }) => formData[action]
  );

  const dispatch = useAppDispatch();

  const { data, error } = useQuery<[], any>(
    "documents",
    documentService.getDocuments
  );

  useEffect(() => {
    if (data) dispatch(setDocuments(data));
    if (error) notify(error.response.data.error, { type: "error" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <FormControl fullWidth sx={{ minWidth: 120, mt: 1 }}>
      <InputLabel>Document</InputLabel>

      <Select
        name="document_id"
        label="Document"
        value={formDataState.document_id}
        onChange={handleChange}
        disabled={
          formDataState.disabledAll || formDataState.disabledAfterAutocomplete
        }
        required
      >
        <MenuItem value="">
          <em>No seleccionado</em>
        </MenuItem>
        {documentsState.map(({ id, document_description }) => (
          <MenuItem key={crypto.randomUUID()} value={id.toString()}>
            {document_description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectDocument;
