"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar
        height="5px"
        color="#3366CC"
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
