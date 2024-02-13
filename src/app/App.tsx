import {
  ContainerToast,
  Footer,
  NavBar,
  ProtectedElement,
} from "@/components/ui";
import authOptions from "@/libs/authOptions";
import ProgressProvider from "@/providers/ProgressProvider";
import QueryClientProvider from "@/providers/QueryClientProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import SessionProviderContext from "@/providers/SessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { getServerSession } from "next-auth";

async function App({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const isAllowed = !!session;
  const permissions = session?.user.permissions!;

  return (
    <AppRouterCacheProvider>
      <ThemeProvider>
        <ProgressProvider>
          <ReduxProvider>
            <CssBaseline />

            <SessionProviderContext>
              <QueryClientProvider>
                <ProtectedElement isAllowed={isAllowed}>
                  <NavBar permissions={permissions} />
                </ProtectedElement>

                {children}

                <ProtectedElement isAllowed={isAllowed}>
                  <Footer />
                </ProtectedElement>

                <ContainerToast />
              </QueryClientProvider>
            </SessionProviderContext>
          </ReduxProvider>
        </ProgressProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export default App;
