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
        height="5px"
        color="#2e2a80"
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
