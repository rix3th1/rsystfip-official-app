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
import { CssBaseline } from "@mui/material";
import { getServerSession } from "next-auth";

async function App({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const isAllowed = !!session;

  return (
    <ProgressProvider>
      <ReduxProvider>
        <ThemeProvider>
          <CssBaseline />

          <SessionProviderContext>
            <QueryClientProvider>
              <ProtectedElement isAllowed={isAllowed}>
                <NavBar permissions={session?.user.permissions!} />
              </ProtectedElement>

              {children}

              <ProtectedElement isAllowed={isAllowed}>
                <Footer />
              </ProtectedElement>

              <ContainerToast />
            </QueryClientProvider>
          </SessionProviderContext>
        </ThemeProvider>
      </ReduxProvider>
    </ProgressProvider>
  );
}

export default App;
