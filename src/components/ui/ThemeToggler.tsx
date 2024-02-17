"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme as useMUITheme } from "@mui/material/styles";
import { useTheme } from "next-themes";
import Tooltip from "@mui/material/Tooltip";

function ThemeToggler(): React.ReactNode {
  const { setTheme } = useTheme();
  const theme = useMUITheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleChange = () => setTheme(isDarkMode ? "ligth" : "dark");

  return (
    <Box
      role="presentation"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      zIndex={100}
    >
      <Tooltip title="Toggle theme">
        <IconButton
          sx={{ ml: 1 }}
          onClick={handleChange}
          color="inherit"
          aria-label="toggle theme"
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ThemeToggler;
