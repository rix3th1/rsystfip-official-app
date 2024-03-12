import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export type TLocale = "en" | "es";

// Can be imported from a shared config
export const locales = <TLocale[]>["en", "es"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(<TLocale>locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
