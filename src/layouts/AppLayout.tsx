import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
    </>
  )
}
