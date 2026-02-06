import { Outlet } from 'react-router-dom';
import Header from '../components/body/Header';
import Footer from '../components/body/Footer';

export default function Root() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="flex justify-center w-full p-4">
        <div className="w-full sm:max-w-[720px]">
          <Outlet />
        </div>
      </main>
      <hr className="border-foreground border-2 my-4" />
      <Footer />
    </div>
  );
}
