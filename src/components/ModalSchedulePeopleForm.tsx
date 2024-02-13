"use client";

import { propsAction } from "@/types/propsAction";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
import FormSchedulePeople from "./FormSchedulePeople";

interface IProps {
  stateModalScheduling: boolean;
  closeModalScheduling: () => void;
}

function ModalSchedulePeopleForm({
  stateModalScheduling,
  closeModalScheduling,
}: IProps): React.ReactNode {
  const [isLoadingScheduleAction, setIsLoadingScheduleAction] = useState(false);

  const changeIsLoadingScheduleAction = useCallback(
    (value: boolean) => setIsLoadingScheduleAction(value),
    []
  );

  return (
    <Dialog open={stateModalScheduling} onClose={closeModalScheduling}>
      <DialogTitle>Agendamiento Programado</DialogTitle>

      <DialogContent>
        <FormSchedulePeople
          action={propsAction.schedule}
          closeModalScheduling={closeModalScheduling}
          changeIsLoadingScheduleAction={changeIsLoadingScheduleAction}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModalScheduling}>Close</Button>

        <LoadingButton
          type="submit"
          form="formSchedule"
          loading={isLoadingScheduleAction}
        >
          Schedule
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalSchedulePeopleForm;
