"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}

export default QueryClientProvider;
