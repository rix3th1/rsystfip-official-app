import pkg from "@/../package.json";
import "@/app/globals.scss";
import { type Metadata } from "next";

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
  return <>{children}</>;
}
