import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import Footer from "./components/Footer";

export default function Root() {
  return (
    <>
      <Header />
      <div className="flex justify-center w-screen">
        <div className="w-full sm:max-w-xl">
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}
