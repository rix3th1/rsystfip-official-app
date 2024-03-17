// import rolesMiddleware from "@/middlewares/rolesMiddlewares";
import { locales } from "@/navigation";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

const publicPages = ["/signin", "/recover-password"];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "always",
  defaultLocale: "es",
  localeDetection: true,
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => {
    return intlMiddleware(req);
    // rolesMiddleware(req);
  }
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
