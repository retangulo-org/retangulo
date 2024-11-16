import React, { useState } from 'react';
import { Collapse } from '../components/Collapse/index';
import { Modal } from '../components/Modal/index';
import Button from '../components/Button';

export default function Ui() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-950">
      <Button
        onClick={() => {
          setIsOpen(!isOpen)
        }}>
        Abrir modal
      </Button>
      <Modal.Root isOpen={isOpen}>
        <Modal.Title>
          Tem certeza?
        </Modal.Title>
        <Modal.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur maiores voluptatem beatae corrupti aspernatur accusantium sed rem eaque tempora, quibusdam exercitationem voluptatum, natus expedita animi nostrum ullam facere excepturi at.
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="outline"
            onClick={() => {
            setIsOpen(!isOpen)
          }}>
            Fechar modal
          </Button>
          <Button
            onClick={() => {
            setIsOpen(!isOpen)
          }}>
            Fechar modal
          </Button>
        </Modal.Actions>
      </Modal.Root>
      <Collapse.Root>
        <Collapse.Toggle>Collapse Toggle</Collapse.Toggle>
        <Collapse.Content>Content</Collapse.Content>
      </Collapse.Root>
    </div>
  );
}
