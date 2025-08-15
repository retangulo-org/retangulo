import { useContext } from 'react';
import { RootContext } from './Root';
import Button from '../ui/Button';
import { Settings } from 'lucide-react';

export default function Modal() {
  const { setModal } = useContext(RootContext);
  return (
    <Button variant="outline" classname="mb-4" onClick={() => setModal(true)}>
      configurações do gerador <Settings />
    </Button>
  );
}
