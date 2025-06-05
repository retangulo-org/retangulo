import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function Back({ title }) {
  const navigate = useNavigate();

  return (
    <div className="w-full relative flex flex-row justify-between items-center">
      <Button size="icon" variant="outline" onClick={() => navigate('/')}>
        <ArrowLeft />
      </Button>
      <h3 className="absolute w-full m-0 p-0 text-center pointer-events-none">{title}</h3>
    </div>
  );
}
