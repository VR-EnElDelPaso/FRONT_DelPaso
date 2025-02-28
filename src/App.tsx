import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const isProd = import.meta.env.PROD;

// Crear una instancia de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY || "", {
    locale: "es-MX",
  });

  useEffect(() => {
    if (!isProd) return;

    const script = document.createElement("script");
    script.src =
      "https://js-cdn.dynatracelabs.com/jstag/145e049b9b1/bf71650gaw/52b613f42b347cd7_complete.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    // Envolver la aplicación con el QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      {/* Incluir ReactQueryDevtools sólo en desarrollo */}
      {!isProd && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;