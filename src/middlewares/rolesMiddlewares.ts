import type { IUser, TPermission, TRole } from "@/interfaces";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequestWithAuth) {
  let pathname = req.nextUrl.pathname;
  pathname = `/${pathname.split("/").slice(2).join("/")}`;
  console.log(pathname);

  // Verify access for api routes.
  if (pathname.startsWith("/api")) {
    // Verify access for routes that not requires "rector" role.
    validateRolesForApiRoutes(
      pathname.startsWith("/api/reports") ||
        pathname.startsWith("/api/statistics")
        ? ["admin", "secretaria"]
        : ["admin", "secretaria", "rector"],
      req
    );
  }
  // Verify access for ITFIP-Rectory routes.
  else if (pathname.startsWith("/ITFIP-Rectory")) {
    // Verify "admin" permissions for "/users/:path*" route
    // missing the "/users/change-password/:id" route.
    if (
      pathname.startsWith("/ITFIP-Rectory/users") &&
      !pathname.startsWith("/ITFIP-Rectory/change-password")
    ) {
      validatePermissionsForPageRoutes("admin", req);
    } // Verify "add" permissions for "/people/create" route.
    else if (
      pathname.startsWith("/ITFIP-Rectory/people/create") &&
      !pathname.startsWith("/ITFIP-Rectory/people/create-schedule")
    ) {
      validatePermissionsForPageRoutes("add", req);
    }
    // Verify "schedule" permissions for "/people/create-schedule" route.
    else if (pathname.startsWith("/ITFIP-Rectory/people/create-schedule")) {
      validatePermissionsForPageRoutes("schedule", req);
    }
    // Verify "reports" permissions for "/reports" route.
    else if (pathname.startsWith("/ITFIP-Rectory/reports")) {
      validatePermissionsForPageRoutes("reports", req);
    }
    // Verify "statistics" permissions for "/statistics/:path*" route.
    else if (pathname.startsWith("/ITFIP-Rectory/statistics")) {
      validatePermissionsForPageRoutes("statistics", req);
    }
  }
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
