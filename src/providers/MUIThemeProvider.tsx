"use client";

import { makeMUITheme } from "@/utils/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { enUS, esES } from "@mui/material/locale";
import { ThemeProvider } from "@mui/material/styles";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function MUIThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const locale = useLocale();
  const MUILocale = locale === "en" ? enUS : esES;

  const { theme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState(
    makeMUITheme("light", MUILocale)
  );

  useEffect(() => {
    theme === "dark"
      ? setCurrentTheme(makeMUITheme("dark", MUILocale))
      : setCurrentTheme(makeMUITheme("light", MUILocale));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, MUILocale]);

  return (
    <ThemeProvider theme={{ ...currentTheme }}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
}

export default MUIThemeProvider;
