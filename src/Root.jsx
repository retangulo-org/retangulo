import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import Footer from './components/Footer';

export default function Root() {
  return (
    <>
      <Header />
      <main className="flex justify-center w-full p-5 bg-neutral-100 dark:bg-neutral-950">
        <div className="w-full sm:max-w-3xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
