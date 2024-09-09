import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="px-20">
        <ToastContainer />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
