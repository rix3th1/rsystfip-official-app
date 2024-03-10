import type { IUser, TPermission, TRole } from "@/interfaces";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

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

export function validatePermissionsForPageRoutes(
  requiredPermission: TPermission,
  req: NextRequestWithAuth
) {
  const user = req.nextauth.token?.user as IUser;
  const userPermissions = user.permissions;

  const isAllowed = userPermissions.includes(requiredPermission);

  if (isAllowed) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/ITFIP-Rectory/home", req.url));
}
