import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./Routes/Routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/config/chartConfig.ts";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Routers} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
