import type { IUser, TRole } from "@/interfaces";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequestWithAuth) {
  const pathname = `/${req.nextUrl.pathname.split("/").slice(2).join("/")}`;

  validateRolesForApiRoutes(
    pathname.startsWith("/api/reports") ||
      pathname.startsWith("/api/statistics")
      ? ["admin", "secretaria"]
      : ["admin", "secretaria", "rector"],
    req
  );
}

export function validateRolesForApiRoutes(
  roles: TRole[],
  req: NextRequestWithAuth
) {
  const user = req.nextauth.token?.user as IUser;
  const userRole = user.role_name;

  const isAllowed = roles.includes(userRole);

  if (isAllowed) {
    return NextResponse.next();
  }

  return NextResponse.json({ error: "Access denied" }, { status: 401 });
}
