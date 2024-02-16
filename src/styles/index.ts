import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const lightTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#3366CC",
    },
    error: {
      main: "#E6161C",
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#3366CC",
    },
    error: {
      main: "#E6161C",
    },
  },
});
