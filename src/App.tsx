import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const isProd = import.meta.env.PROD;

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
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
