"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "next-themes";

function ThemeToggler(): React.ReactNode {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleChange = () => setTheme(isDarkMode ? "ligth" : "dark");

  return (
    <IconButton sx={{ mx: 1 }} onClick={handleChange} color="inherit">
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ThemeToggler;
