"use client";

import { ThemeProvider } from "next-themes";

function NextThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default NextThemeProvider;
