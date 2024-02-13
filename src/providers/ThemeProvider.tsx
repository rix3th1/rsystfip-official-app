"use client";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      // mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#3366CC",
      },
      error: {
        main: "#E6161C",
      },
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;
