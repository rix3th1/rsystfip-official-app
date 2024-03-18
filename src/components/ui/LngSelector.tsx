"use client";

import { usePathname, useRouter } from "@/navigation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState } from "react";

function LngSelector() {
  const t = useTranslations("LngSelector");

  const locale = useLocale();
  const [lng, setLng] = useState(locale);

  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleChange = ({ target: { value: lng } }: SelectChangeEvent) => {
    setLng(lng);
    router.push(`/${lng + pathname}`);
    router.refresh();
    setTheme(`${theme}`);
  };

  return (
    <FormControl sx={{ mx: 1, minW2idth: 120 }} size="small">
      <InputLabel id="lng-selector-label">{t("label")}</InputLabel>
      <Select
        labelId="lng-selector-label"
        id="lng-selector"
        value={lng}
        label={t("label")}
        onChange={handleChange}
      >
        <MenuItem value="es" selected={locale === "es"}>
          {t("es")}
        </MenuItem>
        <MenuItem value="en" selected={locale === "en"}>
          {t("en")}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default LngSelector;
