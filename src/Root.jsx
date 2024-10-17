import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Root() {
  return (
    <>
      <Header />
      <main className="flex justify-center w-full p-5 bg-white dark:bg-black">
        <div className="w-full sm:max-w-2xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
