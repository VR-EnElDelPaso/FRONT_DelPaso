import { Outlet } from "react-router-dom";
import CartCleaner from "@/features/cart/components/CartCleaner";

export default function NoFooterLayout() {
  return (
    <div className="font-inter">
      <div className="min-h-[calc(100svh-100px)]">
        <Outlet />
      </div>
      <CartCleaner />
    </div>
  );
}
