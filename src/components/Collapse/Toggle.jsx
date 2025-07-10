import { useContext } from 'react';
import { RootContext } from './Root';
import Button from '../ui/Button';
import { ChevronUp } from 'lucide-react';

export default function Toggle({ children }) {
  const { isOpen, setIsOpen } = useContext(RootContext);

  return (
    <Button
      variant="outline"
      className={`relative flex flex-row justify-between items-center`}
      onClick={() => setIsOpen(!isOpen)}>
      <span className={`${isOpen ? 'rotate-0' : 'rotate-180'} transition-all duration-300 absolute left-3`}>
        <ChevronUp />
      </span>
      <span className="mx-auto select-none">{children}</span>
    </Button>
  );
}
