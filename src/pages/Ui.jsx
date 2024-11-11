import React from 'react';
import { Collapse } from '../components/Collapse';

export default function Ui() {
  return (
    <div className="flex flex-col bg-neutral-100 dark:bg-neutral-950">
      <Collapse.Root>
        <Collapse.Title>Abrir</Collapse.Title>
        <Collapse.Content>fafafaffs</Collapse.Content>
      </Collapse.Root>
    </div>
  );
}
