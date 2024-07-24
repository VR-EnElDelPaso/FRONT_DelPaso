import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <>
      <AppBar />
      <div className="min-h-[calc(100svh-100px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
