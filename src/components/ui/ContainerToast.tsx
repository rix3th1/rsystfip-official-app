"use client";

import { useTheme as useMUITheme } from "@mui/material/styles";
import { Flip, ToastContainer } from "react-toastify";

function ContainerToast(): React.ReactNode {
  const theme = useMUITheme().palette.mode;

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      transition={Flip}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      limit={4}
      theme={theme}
    />
  );
}

export default ContainerToast;
