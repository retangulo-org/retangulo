import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react"

export default function Root() {
  return (
    <>
      <Header />
      <div className="flex justify-center w-full p-5">
        <div className="w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
      <Analytics />
    </>
  );
}
