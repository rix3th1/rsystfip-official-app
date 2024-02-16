"use client";

import { SessionProvider } from "next-auth/react";

function SessionProviderContext({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SessionProviderContext;
