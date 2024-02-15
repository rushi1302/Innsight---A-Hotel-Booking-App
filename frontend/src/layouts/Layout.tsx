import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="w-[90%] mx-auto  md:max-w-5xl md:mx-auto flex-1 text-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
