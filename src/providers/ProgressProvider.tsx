"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#ffcc00"
        options={{ showSpinner: false }}
      />
      {children}
    </>
  );
}

export default ProgressProvider;
