"use client";

import { type TLocale } from "@/i18n";
import { NextIntlClientProvider, type IntlProvider } from "next-intl";

type Props = Omit<React.ComponentProps<typeof IntlProvider>, "locale"> & {
  locale?: TLocale;
};

export default function NextIntlProvider(props: Props): React.ReactNode {
  return (
    <NextIntlClientProvider
      defaultTranslationValues={{
        i: (text) => <i>{text}</i>,
      }}
      {...props}
    />
  );
}
