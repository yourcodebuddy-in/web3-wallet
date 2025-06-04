"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5000,
      throwOnError(error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.error);
        }
        return false;
      },
      retry: false,
    },
  },
});

interface Props {
  children: React.ReactNode;
}

function ReactQueryProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
