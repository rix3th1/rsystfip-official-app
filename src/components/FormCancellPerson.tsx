"use client";

import { notify } from "@/libs/notify";
import type { FormDataState } from "@/redux/features/appointments/appointmentsSlice";
import { registerAChange } from "@/redux/features/calendar/calendarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cancellationService, scheduleService, sgService } from "@/services";
import type { THandleChangeI, THandleSubmit } from "@/types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

interface IProps {
  closeModalCancell: () => void;
  changeIsLoadingCancellPerson: (value: boolean) => void;
}

function FormCancellPerson({
  closeModalCancell,
  changeIsLoadingCancellPerson,
}: IProps) {
  const formDataInitialState = { cancellation_subject: "" };
  const [formData, setFormData] = useState(formDataInitialState);

  const mutationCancellation = useMutation(
    cancellationService.createCancellation
  );
  const mutationSendEmail = useMutation(sgService.sendEmail);
  const mutationSchedule = useMutation(scheduleService.cancellSchedule);

  const dispatch = useAppDispatch();
  const formDataState: FormDataState = useAppSelector(
    ({ appointments }) => appointments.formData.schedule
  );

  const handleSubmit = async (e: THandleSubmit): Promise<void> => {
    e.preventDefault();

    const payload = {
      person_id: formDataState.id,
      cancellation_subject: formData.cancellation_subject,
    };

    try {
      // person_id is same to formData.id
      const resSchedule = await mutationSchedule.mutateAsync(
        +payload.person_id
      );
      notify(resSchedule.ok, {
        type: "info",
        position: "top-left",
      });

      const resCancellation = await mutationCancellation.mutateAsync(payload);
      notify(resCancellation.ok, {
        type: "info",
        position: "top-left",
      });

      const sgPayload = {
        email: resSchedule.scheduleCancelled.email,
        subject: "Schedule cancelled",
        html: `<strong>${resSchedule.scheduleCancelled.first_name} ${resSchedule.scheduleCancelled.last_name}</strong>, your schedule cite for the day <code>${resSchedule.scheduleCancelled.start_time} has been cancelled. The reason of cancellation is: <code>${payload.cancellation_subject}</code>.</br><img src='https://repositorio.itfip.edu.co/themes/Mirage2/images/logo_wh.png'>`,
      };
      const resSendgrid = await mutationSendEmail.mutateAsync(sgPayload);
      notify(resSendgrid.ok, {
        type: "success",
        position: "top-left",
      });

      dispatch(registerAChange());
      setFormData(formDataInitialState);
      closeModalCancell();
    } catch (error) {
      if (isAxiosError(error)) {
        notify(error.response?.data.error, { type: "error" });
      }
    }
  };

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    changeIsLoadingCancellPerson(
      mutationCancellation.isLoading ||
        mutationSchedule.isLoading ||
        mutationSendEmail.isLoading
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mutationCancellation.isLoading,
    mutationSchedule.isLoading,
    mutationSendEmail.isLoading,
  ]);

  return (
    <Box component="form" onSubmit={handleSubmit} id="formCancellation">
      <TextField
        margin="dense"
        required
        fullWidth
        variant="standard"
        name="cancellation_subject"
        label="Cancellation subject"
        onChange={handleChange}
        value={formData.cancellation_subject}
        multiline
        rows={4}
        type="text"
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 10, maxLength: 150 }}
        autoFocus
      />
    </Box>
  );
}

export default FormCancellPerson;
