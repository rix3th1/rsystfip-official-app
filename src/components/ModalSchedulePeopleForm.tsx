"use client";

import { PropsAction } from "@/enums";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("ModalSchedulePeopleForm");

  const [isLoadingScheduleAction, setIsLoadingScheduleAction] = useState(false);

  const changeIsLoadingScheduleAction = useCallback(
    (value: boolean) => setIsLoadingScheduleAction(value),
    []
  );

  return (
    <Dialog
      open={stateModalScheduling}
      onClose={closeModalScheduling}
      disableScrollLock
    >
      <DialogTitle>{t("title")}</DialogTitle>

      <DialogContent>
        <FormSchedulePeople
          action={PropsAction.schedule}
          closeModalScheduling={closeModalScheduling}
          changeIsLoadingScheduleAction={changeIsLoadingScheduleAction}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModalScheduling}>{t("close")}</Button>

        <LoadingButton
          type="submit"
          form="formSchedule"
          loading={isLoadingScheduleAction}
        >
          {t("submit")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalSchedulePeopleForm;
