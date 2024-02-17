"use client";

import { darkTheme, lightTheme } from "@/utils/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function MUIThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const { theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    theme === "dark" ? setCurrentTheme(darkTheme) : setCurrentTheme(lightTheme);
  }, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
}

export default MUIThemeProvider;
