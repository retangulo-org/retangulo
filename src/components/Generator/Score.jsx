import React, { useContext } from 'react';
import { RootContext } from './Root';
import { Modal } from '../Modal';
import Button from '../ui/Button';
import { Check, X, Clock } from 'lucide-react';

export default function Score() {
  const { score, setScore, correct, wrong, seconds } = useContext(RootContext);

  return (
    <Modal.Root isOpen={score}>
      <Modal.Title>Pontuação</Modal.Title>
      <Modal.Content>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full py-2 px-4 flex flex-row justify-between gap-4 bg-success text-neutral-100 font-semibold rounded-t-sm">
            <div className="flex flex-row justify-center gap-4">
              <Check /> Certos
            </div>
            {correct}
          </div>
          <div className="w-full py-2 px-4 flex flex-row justify-between gap-4 bg-danger text-neutral-100 font-semibold">
            <div className="flex flex-row justify-center gap-4">
              <X /> Errados
            </div>
            {wrong}
          </div>
          <div className="w-full py-2 px-4 flex flex-row justify-between gap-4 bg-warning text-neutral-100 font-semibold rounded-b-sm">
            <div className="flex flex-row justify-center gap-4">
              <Clock /> Tempo
            </div>
            {seconds}
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            setScore(false);
          }}>
          Reiniciar
        </Button>
      </Modal.Actions>
    </Modal.Root>
  );
}
