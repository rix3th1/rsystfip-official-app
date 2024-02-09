import pkg from "@/../package.json";
import { type Metadata } from "next";
import { Roboto } from "next/font/google";
import App from "./App";
import "./globals.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  applicationName: pkg.name,
  title: "RSystfip | Agendamiento Citas Rectoría ITFIP",
  generator: "Next JS",
  description: pkg.description,
  authors: { ...pkg.author, ...pkg.contributors },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="shortcut icon"
          href="/rsystfip_logotype.svg"
          type="image/x-icon"
        />
      </head>
      <body className={roboto.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
