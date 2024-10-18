import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Play/Button';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main>
        <div className="w-full h-[70vh] p-4 flex flex-col justify-center items-center gap-8 bg-neutral-100 dark:bg-neutral-950">
          <h1 className="text-4xl sm:text-6xl text-center font-black">
            Resolva exercícios <br /> matématicos
          </h1>
          <p className="text-center w-full sm:w-1/2">
            Gere contas matemáticas infinitamente, resolva-os no menor tempo possível & decore e resolva cálculos de
            cabeça.
          </p>
          <div className="w-full sm:w-96">
            <Button onClick={() => navigate('/jogar')} text="Jogar" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
