import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function NoAppBarLayout() {
  return (
    <>
      <div className="min-h-[calc(100svh-100px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
