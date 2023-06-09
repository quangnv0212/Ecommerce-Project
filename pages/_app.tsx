import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import MainLayout from "@/layouts/MainLayout";
import { AppProvider } from "@/contexts/app.context";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <AppProvider>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer />
          </AppProvider>
        </MainLayout>
      </QueryClientProvider>
    </>
  );
}
