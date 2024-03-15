import pkg from "@/../package.json";
import "@/app/globals.scss";
import { App } from "@/components";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Index");
  return {
    applicationName: pkg.name,
    title: `RSystfip | ${t("title")}`,
    generator: "Next JS",
    description: pkg.description,
    authors: { ...pkg.author, ...pkg.contributors },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="shortcut icon"
          href="/rsystfip_logotype.svg"
          type="image/x-icon"
        />
      </head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
