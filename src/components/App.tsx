import {
  ContainerToast,
  Footer,
  NavBar,
  ProtectedElement,
  ScrollTopButton,
  ThemeToggler,
} from "@/components/ui";
import type { TLocale } from "@/i18n";
import authOptions from "@/libs/authOptions";
import MUIThemeProvider from "@/providers/MUIThemeProvider";
import NextIntlProvider from "@/providers/NextIntlProvider";
import NextThemeProvider from "@/providers/NextThemeProvider";
import ProgressProvider from "@/providers/ProgressProvider";
import QueryClientProvider from "@/providers/QueryClientProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { getServerSession } from "next-auth";
import { getLocale, getMessages } from "next-intl/server";

async function App({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const isAllowed = !!session;

  const locale = (await getLocale()) as TLocale;
  const messages = await getMessages();

  return (
    <NextThemeProvider>
      <AppRouterCacheProvider>
        <MUIThemeProvider>
          <ProgressProvider>
            <ReduxProvider>
              <QueryClientProvider>
                <NextIntlProvider locale={locale} messages={messages}>
                  <ProtectedElement isAllowed={isAllowed}>
                    <NavBar session={session} />
                  </ProtectedElement>

                  {/* Pages rendering */}
                  {children}

                  <ProtectedElement isAllowed={isAllowed}>
                    <Footer />
                  </ProtectedElement>

                  <ThemeToggler />
                  <ScrollTopButton />

                  <ContainerToast />
                </NextIntlProvider>
              </QueryClientProvider>
            </ReduxProvider>
          </ProgressProvider>
        </MUIThemeProvider>
      </AppRouterCacheProvider>
    </NextThemeProvider>
  );
}

export default App;
