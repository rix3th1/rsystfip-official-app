import {
  validatePermissionsForPageRoutes,
  validateRolesForApiRoutes,
} from "@/middlewares/rolesMiddlewares";
import { locales } from "@/navigation";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

const publicPages = ["/signin", "/recover-password"];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "es",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req)

  // {

  //   const pathname = req.nextUrl.pathname;

  //   // Verify access for api routes.
  //   if (pathname.startsWith("/api")) {
  //     // Verify access for routes that not requires "rector" role.
  //     validateRolesForApiRoutes(
  //       pathname.startsWith("/api/reports") ||
  //         pathname.startsWith("/api/statistics")
  //         ? ["admin", "secretaria"]
  //         : ["admin", "secretaria", "rector"],
  //       req
  //     );
  //   }
  //   // Verify access for ITFIP-Rectory routes.
  //   else if (pathname.startsWith("/ITFIP-Rectory")) {
  //     // Verify "admin" permissions for "/users/:path*" route
  //     // missing the "/users/change-password/:id" route.
  //     if (
  //       pathname.startsWith("/ITFIP-Rectory/users") &&
  //       !pathname.startsWith("/ITFIP-Rectory/change-password")
  //     ) {
  //       validatePermissionsForPageRoutes("admin", req);
  //     } // Verify "add" permissions for "/people/create" route.
  //     else if (
  //       pathname.startsWith("/ITFIP-Rectory/people/create") &&
  //       !pathname.startsWith("/ITFIP-Rectory/people/create-schedule")
  //     ) {
  //       validatePermissionsForPageRoutes("add", req);
  //     }
  //     // Verify "schedule" permissions for "/people/create-schedule" route.
  //     else if (pathname.startsWith("/ITFIP-Rectory/people/create-schedule")) {
  //       validatePermissionsForPageRoutes("schedule", req);
  //     }
  //     // Verify "reports" permissions for "/reports" route.
  //     else if (pathname.startsWith("/ITFIP-Rectory/reports")) {
  //       validatePermissionsForPageRoutes("reports", req);
  //     }
  //     // Verify "statistics" permissions for "/statistics/:path*" route.
  //     else if (pathname.startsWith("/ITFIP-Rectory/statistics")) {
  //       validatePermissionsForPageRoutes("statistics", req);
  //     }
  //   }
  // }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

// export const config = {
//   matcher: [
//     // Match only internationalized pathnames
//     "/",
//     "/(es|en)/:path*",

//     // RSystfip App
//     "/api/:path*",
//     "/ITFIP-Rectory/:path*",
//   ],
// };
