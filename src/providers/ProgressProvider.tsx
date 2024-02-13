"use client";

import Box from "@mui/material/Box";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        component={ProgressBar}
        height="5px"
        color="#feca00"
        options={{
          showSpinner: false,
        }}
        shallowRouting
        sx={{ zIndex: 100 }}
      />
      {children}
    </>
  );
}

export default ProgressProvider;
