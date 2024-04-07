"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import FormCancellPerson from "./FormCancellPerson";

interface IProps {
  stateModalCancell: boolean;
  closeModalCancell: () => void;
}

function ModalCancellPersonConfirmation({
  stateModalCancell,
  closeModalCancell,
}: IProps): React.ReactNode {
  const t = useTranslations("ModalCancellPersonConfirmation");

  const [isLoadingCancellPerson, setIsLoadingCancellPerson] = useState(false);

  const changeIsLoadingCancellPerson = useCallback(
    (value: boolean) => setIsLoadingCancellPerson(value),
    []
  );

  return (
    <Dialog
      open={stateModalCancell}
      onClose={closeModalCancell}
      disableScrollLock
    >
      <DialogTitle>{t("title")}</DialogTitle>

      <DialogContent>
        <DialogContentText>{t("confirm")}</DialogContentText>

        <FormCancellPerson
          closeModalCancell={closeModalCancell}
          changeIsLoadingCancellPerson={changeIsLoadingCancellPerson}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModalCancell}>{t("no")}</Button>

        <LoadingButton
          type="submit"
          form="formCancellation"
          loading={isLoadingCancellPerson}
        >
          {t("yes")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ModalCancellPersonConfirmation;
