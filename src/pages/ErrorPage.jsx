import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center w-full p-5 bg-neutral-100 dark:bg-neutral-950">
      <div className="flex flex-col w-full sm:max-w-3xl h-[80vh] gap-5 justify-center items-center text=black dark:text-white">
        <h1 className="text-7xl font-bold">Erro 404</h1>
        <p>A página não foi encontrada.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Voltar para o início
        </Button>
      </div>
    </div>
  );
}
