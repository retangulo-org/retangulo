import { useContext } from 'react';
import { RootContext } from './Root';
import Button from '../Button';
import { Settings } from 'lucide-react';

export default function Modal() {
  const { setModal }: any = useContext(RootContext);

  return (
    <Button variant="outline" className="mb-4" onClick={() => setModal(true)}>
      Configuração do Gerador <Settings />
    </Button>
  );
}
