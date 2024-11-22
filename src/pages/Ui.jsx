import React, { useState } from 'react';
import { Collapse } from '../components/Collapse/index';
import { Modal } from '../components/Modal/index';
import Button from '../components/Button';
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
      <Collapse.Root>
        <Collapse.Toggle>Collapse Toggle</Collapse.Toggle>
        <Collapse.Content>Content</Collapse.Content>
      </Collapse.Root>
    </Transition>
  );
}
