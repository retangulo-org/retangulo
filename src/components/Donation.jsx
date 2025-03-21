import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import Button from './Button';
import { X } from 'lucide-react';

export default function Donation() {
  const [pixModal, setPixModal] = useState(() => localStorage.getItem('pixDonation') || 'true');
  const [pix, setPix] = useState(true);

  useEffect(() => {
      localStorage.setItem('pixDonation', pixModal);
    }, [pixModal]);

  return (
    <>
      {pixModal === 'true' && (
        <Modal.Root isOpen={pix}>
          <Modal.Title>
            <div className="flex flex-row justify-between">
              Doação
              <Button
              variant='outline'
                size="icon"
                onClick={() => {
                  setPix(false);
                }}>
                <X />
              </Button>
            </div>
          </Modal.Title>
          <Modal.Content>
            <p>
              Estou juntando dinheiro para montar um computador melhor. Se o Retangulo ti ajudou de alguma forma,
              considere fazer uma doação de qualquer valor (se o valor não fizer falta) no PIX abaixo (no nome de Leydson Andrey):
            </p>
            <div className="flex flex-row gap-4 items-center justify-center">
              <h3>pix@retangulo.org</h3>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <div className="w-full flex flex-col gap-4">
              <Button
                variant='danger'
                onClick={() => {
                  setPixModal('false');
                }}>
                Não mostrar novamente
              </Button>
            </div>
          </Modal.Actions>
        </Modal.Root>
      )}
    </>
  );
}