import "../styles/fontStyle.css";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHydrateAtoms } from "jotai/react/utils";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import { queryClientAtom } from "jotai-tanstack-query";

const queryClient = new QueryClient();

const HydrateAtoms = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return <>{children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <HydrateAtoms>
          <Component {...pageProps} />
        </HydrateAtoms>
      </Provider>
    </QueryClientProvider>
  );
}
