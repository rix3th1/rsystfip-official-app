import { type PaletteMode } from "@mui/material";
import { type Localization } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const makeMUITheme = (mode: PaletteMode, locale: Localization) =>
  createTheme(
    {
      typography: {
        fontFamily: roboto.style.fontFamily,
      },
      palette: {
        mode,
        primary: {
          main: "#3366CC",
        },
        error: {
          main: "#E6161C",
        },
      },
    },
    locale
  );
