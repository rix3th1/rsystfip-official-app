"use client";

import { notify } from "@/libs/notify";
import {
  AppointmentStatus,
  setFormData,
  type Deans,
  type FormDataState,
} from "@/redux/features/appointments/appointmentsSlice";
import { registerAChange } from "@/redux/features/calendar/calendarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deanService, peopleService, scheduleService } from "@/services";
import type { THandleChangeITS, THandleSubmit } from "@/types";
import { propsAction } from "@/types/propsAction";
import { Box, Grid, TextField, type SelectChangeEvent } from "@mui/material";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import FooterFormPeople from "./FooterFormPeople";
import SelectDocument from "./SelectDocument";
import SelectFaculties from "./SelectFaculties";
import SelectPerson from "./SelectPerson";
import { ProtectedElement } from "./ui";

interface IProps {
  action: propsAction;
  closeModalScheduling?: () => void;
  changeIsLoadingScheduleAction?: (value: boolean) => void;
}

export type actionFormSchedule = IProps["action"];

function FormSchedulePeople({
  action,
  closeModalScheduling,
  changeIsLoadingScheduleAction,
}: IProps): React.ReactNode {
  const params = useParams<{ id: string }>();

  const facultieSelectRef = useRef<HTMLSelectElement>(null);

  const dispatch = useAppDispatch();

  const formDataState: FormDataState = useAppSelector(
    ({ appointments: { formData } }) => formData[action]
  );

  const deansState: Array<Deans> = useAppSelector(
    ({ appointments }) => appointments.deans
  );

  const mutationEditPerson = useMutation(peopleService.editPeople, {
    onSuccess(data) {
      notify(data.ok, {
        type: "success",
        position: "top-left",
      });

      dispatch(setFormData([action]));
    },
    onError(error: any) {
      notify(error.response.data.error, { type: "error" });
    },
  });
  const mutationSavePeople = useMutation(peopleService.savePeople);
  const mutationSchedule = useMutation(scheduleService.saveSchedule);
  const mutationSaveDean = useMutation(deanService.saveDean);

  const editPerson = () => {
    const payload = {
      id: params.id,
      category_id: formDataState.category_id,
      first_name: formDataState.first_name,
      last_name: formDataState.last_name,
      document_id: formDataState.document_id,
      document_number: formDataState.document_number,
      faculty_id: formDataState.faculty_id,
      email: formDataState.email,
      phone_number: formDataState.phone_number,
    };

    mutationEditPerson.mutate(payload);
  };

  const schedulePerson = async (
    closeModalScheduling?: IProps["closeModalScheduling"]
  ): Promise<void> => {
    const payload = {
      category_id: formDataState.category_id,
      first_name: formDataState.first_name,
      last_name: formDataState.last_name,
      document_id: formDataState.document_id,
      document_number: formDataState.document_number,
      email: formDataState.email,
      phone_number: formDataState.phone_number,
      faculty_id: formDataState.faculty_id,
      visit_subject: formDataState.visit_subject,
      color: formDataState.color,
      start_time: formDataState.start_time,
      end_time: formDataState.end_time,
      status: formDataState.status,
    };

    try {
      const resSavePeople = await mutationSavePeople.mutateAsync(payload);
      notify(resSavePeople.ok, {
        type: "info",
        position: "top-left",
      });

      if (payload.category_id === "4") {
        const resDean = await mutationSaveDean.mutateAsync({
          id: payload.document_number,
          first_name: payload.first_name,
          last_name: payload.last_name,
          faculty_id: payload.faculty_id,
        });
        notify(resDean.ok, {
          type: "info",
          position: "top-left",
        });
      }

      const resSchedule = await mutationSchedule.mutateAsync({
        person_id: resSavePeople.personCreated.id.toString(),
        start_time: payload.start_time || undefined,
        end_time: payload.end_time || undefined,
        visit_subject: payload.visit_subject,
        status: payload.status,
        color: payload.color,
      });
      notify(resSchedule.ok, {
        type: "success",
        position: "top-left",
      });

      // Do the dispatch at redux state
      dispatch(setFormData([action]));

      // Finish the function if status isn't scheduled
      if (
        formDataState.status !== AppointmentStatus.scheduled ||
        !closeModalScheduling
      )
        return;

      dispatch(registerAChange());
      closeModalScheduling();
    } catch (error) {
      if (isAxiosError(error)) {
        notify(error.response?.data.error, { type: "error" });
      }
    }
  };

  const executionsToSubmit = {
    [propsAction.add]: () => {
      dispatch(
        setFormData([
          action,
          {
            ...formDataState,
            status: AppointmentStatus.daily,
          },
        ])
      );

      return schedulePerson();
    },
    [propsAction.edit]: () => editPerson(),
    [propsAction.schedule]: () => schedulePerson(closeModalScheduling),
  };

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();
    executionsToSubmit[action]();
  };

  const personData = useQuery<any, any>(
    ["personData", params.id],
    () => peopleService.getData(params.id),
    { enabled: Boolean(params.id) }
  );

  const handleChange = (e: THandleChangeITS | SelectChangeEvent) => {
    dispatch(
      setFormData([
        action,
        {
          ...formDataState,
          [e.target.name]: e.target.value,
        },
      ])
    );
  };

  const autocompleteDeansData = () => {
    if (
      !deansState ||
      formDataState.category_id !== "4" ||
      action === propsAction.edit
    )
      return;

    for (let i = 0; i < deansState.length; i++) {
      const { id, first_name, last_name, faculty_id } = deansState[i];

      if (id !== formDataState.document_number) continue;

      dispatch(
        setFormData([
          action,
          {
            ...formDataState,
            document_id: "1",
            first_name,
            last_name,
            faculty_id: faculty_id.toString(),
            disabledAfterAutocomplete: true,
          },
        ])
      );

      if (facultieSelectRef.current) {
        facultieSelectRef.current.className = "form-control border-0 bg-white";
      }

      notify("The data deans has been auto-completed", {
        type: "info",
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    autocompleteDeansData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDataState.document_number]);

  useEffect(() => {
    const { data, error } = personData;
    if (data)
      dispatch(
        setFormData([
          action,
          {
            ...formDataState,
            category_id: data.category_id.toString(),
            document_id: data.document_id.toString(),
            faculty_id: data.faculty_id.toString(),
            first_name: data.first_name,
            last_name: data.last_name,
            document_number: data.document_number,
            phone_number: data.phone_number,
            email: data.email,
          },
        ])
      );
    if (error) notify(error.response.data.error, { type: "error" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personData.data, personData.error]);

  useEffect(() => {
    if (changeIsLoadingScheduleAction) {
      changeIsLoadingScheduleAction(
        mutationEditPerson.isLoading ||
          mutationSavePeople.isLoading ||
          mutationSchedule.isLoading ||
          mutationSaveDean.isLoading
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mutationEditPerson.isLoading,
    mutationSavePeople.isLoading,
    mutationSchedule.isLoading,
    mutationSaveDean.isLoading,
  ]);

  return (
    <Box component="form" onSubmit={handleSubmit} id="formSchedule">
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6}>
          <SelectPerson
            action={action}
            handleChange={handleChange}
            facultieSelectRef={facultieSelectRef}
          />
        </Grid>

        <Grid item md={6}>
          <SelectFaculties
            action={action}
            handleChange={handleChange}
            facultieSelectRef={facultieSelectRef}
          />
        </Grid>

        <Grid item md={6}>
          <SelectDocument action={action} handleChange={handleChange} />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="document_number"
            label="Document number"
            onChange={handleChange}
            value={formDataState.document_number}
            type="text"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 8, maxLength: 10 }}
            disabled={
              formDataState.disabledAll ||
              formDataState.disabledAfterAutocomplete
            }
            autoFocus
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="first_name"
            label="First name"
            onChange={handleChange}
            value={formDataState.first_name}
            type="text"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 3, maxLength: 25 }}
            disabled={
              formDataState.disabledAll ||
              formDataState.disabledAfterAutocomplete
            }
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="last_name"
            label="Last name"
            onChange={handleChange}
            value={formDataState.last_name}
            type="text"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 3, maxLength: 25 }}
            disabled={
              formDataState.disabledAll ||
              formDataState.disabledAfterAutocomplete
            }
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone_number"
            label="Phone number"
            onChange={handleChange}
            value={formDataState.phone_number}
            type="text"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 10, maxLength: 10 }}
            disabled={
              formDataState.disabledAll ||
              formDataState.disabledAfterAutocomplete
            }
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Contact email"
            onChange={handleChange}
            value={formDataState.email}
            type="email"
            autoComplete="off"
            spellCheck={false}
            inputProps={{ minLength: 10, maxLength: 30 }}
            disabled={
              formDataState.disabledAll ||
              formDataState.disabledAfterAutocomplete
            }
          />
        </Grid>

        <ProtectedElement isAllowed={action !== propsAction.edit}>
          <Grid item md={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="visit_subject"
              label="Visit subject"
              onChange={handleChange}
              value={formDataState.visit_subject}
              type="text"
              multiline
              rows={4}
              autoComplete="off"
              spellCheck={false}
              inputProps={{ minLength: 10, maxLength: 150 }}
              disabled={formDataState.disabledAll}
            />
          </Grid>
        </ProtectedElement>

        <ProtectedElement isAllowed={action === propsAction.schedule}>
          <Grid item md={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="color"
              label="Appointment color"
              onChange={handleChange}
              value={formDataState.color}
              type="color"
              disabled={formDataState.disabledAll}
            />
          </Grid>
        </ProtectedElement>
      </Grid>

      <ProtectedElement isAllowed={action !== propsAction.schedule}>
        <FooterFormPeople
          isEdit={action === propsAction.edit}
          isLoading={
            mutationEditPerson.isLoading ||
            mutationSavePeople.isLoading ||
            mutationSchedule.isLoading ||
            mutationSaveDean.isLoading
          }
        />
      </ProtectedElement>
    </Box>
  );
}

export default FormSchedulePeople;
