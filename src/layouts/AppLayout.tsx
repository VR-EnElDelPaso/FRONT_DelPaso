import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import Footer from "../components/Footer/Footer";
import CartCleaner from "../features/cart/components/CartCleaner";
import { useFetchMuseums } from "@/features/museum/museum.querys";
import { useState } from "react";
import MuseumScroller from "@/components/AppBar/MuseumScroller/MuseumScoller";

export default function AppLayout() {
  const [museumsBanner, setMuseumsBanner] = useState(false);
  const { data: museumsResponse } = useFetchMuseums();
  const museums = museumsResponse?.data || [];
  return (
    <div className="font-inter">
      <div className="sticky top-0 z-50 ">
        <AppBar setIsMenuOpen={setMuseumsBanner} />
        {museumsBanner && <MuseumScroller museums={museums} />}
      </div>
      <div className="min-h-[calc(100svh-100px)]">
        <Outlet />
      </div>
      <Footer />
      <CartCleaner />
    </div>
  );
}
