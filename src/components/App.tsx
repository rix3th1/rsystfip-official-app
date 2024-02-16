import {
  ContainerToast,
  Footer,
  NavBar,
  ProtectedElement,
  ScrollTopButton,
  ThemeToggler,
} from "@/components/ui";
import authOptions from "@/libs/authOptions";
import MUIThemeProvider from "@/providers/MUIThemeProvider";
import NextThemeProvider from "@/providers/NextThemeProvider";
import ProgressProvider from "@/providers/ProgressProvider";
import QueryClientProvider from "@/providers/QueryClientProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import SessionProviderContext from "@/providers/SessionProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { getServerSession } from "next-auth";

async function App({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const isAllowed = !!session;

  return (
    <NextThemeProvider>
      <AppRouterCacheProvider>
        <MUIThemeProvider>
          <ProgressProvider>
            <ReduxProvider>
              <SessionProviderContext>
                <QueryClientProvider>
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
                </QueryClientProvider>
              </SessionProviderContext>
            </ReduxProvider>
          </ProgressProvider>
        </MUIThemeProvider>
      </AppRouterCacheProvider>
    </NextThemeProvider>
  );
}

export default App;
