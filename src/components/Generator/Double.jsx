import { useContext } from 'react';
import { RootContext } from './Root';
import Button from '../Button';
import { Check, X } from 'lucide-react';

export default function Double() {
  const { setDouble } = useContext(RootContext);

  return (
    <form
      className="flex flex-row gap-3 items-center w-full"
      onSubmit={(e) => {
        e.preventDefault();
        valueCheck();
      }}>
      <Button variant="success" onClick={() => setDouble(true)}>
        <Check /> Verdadeiro
      </Button>
      <Button variant="danger" onClick={() => setDouble(false)}>
        <X /> Falso
      </Button>
    </form>
  )
}



