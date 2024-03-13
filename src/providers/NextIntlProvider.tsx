"use client";

import { NextIntlClientProvider, type IntlProvider } from "next-intl";

type Props = Omit<React.ComponentProps<typeof IntlProvider>, "locale"> & {
  locale?: string;
};

export default function NextIntlProvider(props: Props): React.ReactNode {
  return <NextIntlClientProvider {...props} />;
}
