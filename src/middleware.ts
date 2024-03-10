import { withAuth } from "next-auth/middleware";
import {
  validatePermissionsForPageRoutes,
  validateRolesForApiRoutes,
} from "./middlewares/rolesMiddlewares";

export const config = {
  matcher: ["/api/:path*", "/ITFIP-Rectory/:path*"],
};

export default withAuth(function middleware(req) {
  const pathname = req.nextUrl.pathname;

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
});
