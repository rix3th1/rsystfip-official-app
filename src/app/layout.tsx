import pkg from "@/../package.json";
import "@/app/globals.scss";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  applicationName: pkg.name,
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
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
