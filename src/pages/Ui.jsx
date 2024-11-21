import React, { useState } from 'react';
import { Collapse } from '../components/Collapse/index';
import { Modal } from '../components/Modal/index';
import Button from '../components/Button';
import Radio from '../components/Radio';
import Transition from '../components/Transition';

export default function Ui() {
  const [isOpen, setIsOpen] = useState(false);
  const [radio, setRadio] = useState('ativo');

  return (
    <Transition className="flex flex-col bg-neutral-100 dark:bg-neutral-950">
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        Abrir modal
      </Button>
      <Modal.Root isOpen={isOpen}>
        <Modal.Title>Tem certeza?</Modal.Title>
        <Modal.Content>
          <Radio
            label="Modo speedrun"
            value="ativo"
            checked={radio === 'ativo'}
            onChange={(e) => setRadio(e.target.value)}
          />
          <Radio
            label="Tempo limite"
            value="ativo2"
            checked={radio === 'ativo2'}
            onChange={(e) => setRadio(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
            }}>
            Fechar modal
          </Button>
        </Modal.Actions>
      </Modal.Root>
      <Collapse.Root>
        <Collapse.Toggle>Collapse Toggle</Collapse.Toggle>
        <Collapse.Content>Content</Collapse.Content>
      </Collapse.Root>
    </Transition>
  );
}
