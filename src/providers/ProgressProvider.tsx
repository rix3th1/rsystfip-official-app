"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import useMediaQuery from "@mui/material/useMediaQuery";

function ProgressProvider({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      <ProgressBar
        height="5px"
        color={prefersDarkMode ? "#2e2a80" : "#fbd90a"}
        options={{
          showSpinner: false,
        }}
        shallowRouting
      />
      {children}
    </>
  );
}

export default ProgressProvider;
