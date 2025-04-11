import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Settings } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[url(https://images.pexels.com/photos/5418148/pexels-photo-5418148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] p-4 flex flex-col justify-between bg-center bg-cover rounded-sm h-96">
        <div>
          <h2>Matematica</h2>
          <p>Gere calculos matematicos aleatorios</p>
        </div>
        <div className="flex flex-row gap-4">
          <Button variant="primary" onClick={() => navigate('/gerador')}>
            Iniciar
          </Button>
          <Button variant="primary" size="icon">
            <Settings />
          </Button>
        </div>
      </div>
    </>
  );
}
