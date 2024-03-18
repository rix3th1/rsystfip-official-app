import type { TPermission } from "@/interfaces";
import authOptions from "@/libs/authOptions";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";

async function ReportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const permissions = session?.user.permissions! as TPermission[];

  const isAllowed = permissions.includes("reports");

  if (!isAllowed) {
    redirect("/ITFIP-Rectory/home");
  }

  return <>{children}</>;
}

export default ReportsLayout;
