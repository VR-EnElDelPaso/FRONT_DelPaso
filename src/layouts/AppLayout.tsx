import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import Footer from "../components/Footer";
import CartCleaner from "../features/cart/components/CartCleaner";

export default function AppLayout() {
  return (
    <div className="font-inter">
      <AppBar />
      <div className="min-h-[calc(100svh-100px)]">
        <Outlet />
      </div>
      <Footer />
      <CartCleaner />
    </div>
  );
}
