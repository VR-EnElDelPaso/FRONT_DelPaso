import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Toaster } from "@/components/ui/toaster";

function App() {
  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY || "", {
    locale: "es-MX",
  });

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
