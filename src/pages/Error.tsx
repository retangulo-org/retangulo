import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import Meta from '../components/Meta';

export default function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Meta
      title="Erro 404 — Gerador de Cálculos Matemáticos — Retangulo.org"
      canonical={`https://retangulo.org${location.pathname}`}
      desc="Resolva cálculos matemáticos aleatórios & melhore seu cálculo mental.">
      <div className="flex justify-center items-center w-full h-dvh">
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="text-7xl font-bold">Erro 404</h1>
          <p className="mb-12">Página não encontrada.</p>
          <Button variant="primary" size={'default'} onClick={() => navigate('/')}>
            Voltar para o início
          </Button>
        </div>
      </div>
    </Meta>
  );
}
