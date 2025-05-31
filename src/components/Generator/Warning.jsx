import { useContext } from 'react';
import { RootContext } from './Root';

export default function Warning() {
  const { warning } = useContext(RootContext);

  return (
    <p className="my-6 p-0 text-center font-mono tracking-[0.1rem]">
      {warning}
    </p>
  );
}
