import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { type IUser } from "@/interfaces";

export const config = {
  matcher: ["/ITFIP-Rectory/:path*", "/api/:path*"],
};

export default withAuth(function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const user = req.nextauth.token?.user as IUser;
  const userRole = user.role_name;
  const userPermissions = user.permissions;

  // Verify access for api routes.
  if (pathname.startsWith("/api")) {
    // Allowed ITFIP-Rectory roles.
    const roles = ["admin", "secretaria", "rector"];

    // Verify access for routes that not requires "rector" role.
    if (
      pathname.startsWith("/api/reports") ||
      pathname.startsWith("/api/statistics")
    ) {
      // make a copy of the roles array without the "rector" role
      const rolesWithoutUser = roles.toSpliced(roles.indexOf("rector"), 1);
      const isAllowed = rolesWithoutUser.includes(userRole);

      if (isAllowed) {
        return NextResponse.next();
      }

      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    } // Verify access for routes that requires all roles.
    else {
      const isAllowed = roles.includes(userRole);

      if (isAllowed) {
        return NextResponse.next();
      }

      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }
  }
  // Verify access for ITFIP-Rectory routes.
  else if (pathname.startsWith("/ITFIP-Rectory")) {
    // Verify "admin" permissions for "/users/:path*" route
    // missing the "/users/change-password/:id" route.
    if (
      pathname.startsWith("/ITFIP-Rectory/users") &&
      !pathname.startsWith("/ITFIP-Rectory/change-password")
    ) {
      const isAllowed = userPermissions.includes("admin");

      if (isAllowed) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/ITFIP-Rectory/home", req.url));
    } // Verify "add" permissions for "/people/create" route.
    else if (
      pathname.startsWith("/ITFIP-Rectory/people/create") &&
      !pathname.startsWith("/ITFIP-Rectory/people/create-schedule")
    ) {
      const isAllowed = userPermissions.includes("add");

      if (isAllowed) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/ITFIP-Rectory/home", req.url));
    }
    // Verify "schedule" permissions for "/people/create-schedule" route.
    else if (pathname.startsWith("/ITFIP-Rectory/people/create-schedule")) {
      const isAllowed = userPermissions.includes("schedule");

      if (isAllowed) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/ITFIP-Rectory/home", req.url));
    }
    // Verify "reports" permissions for "/reports" route.
    else if (pathname.startsWith("/ITFIP-Rectory/reports")) {
      const isAllowed = userPermissions.includes("reports");

      if (isAllowed) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/ITFIP-Rectory/home", req.url));
    }
    // Verify "statistics" permissions for "/statistics/:path*" route.
    else if (pathname.startsWith("/ITFIP-Rectory/statistics")) {
      const isAllowed = userPermissions.includes("statistics");

      if (isAllowed) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/ITFIP-Rectory/home", req.url));
    }
  }
});
