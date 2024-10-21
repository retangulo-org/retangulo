import { useState } from 'react';

import Input from '../components/Input';
import Button from '../components/Play/Button';
import Tag from '../components/Play/Tag';
import Modal from '../components/Play/Modal';
import Card from '../components/Card';

export default function Ui() {
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);
  return (
    <main className="p-4 flex flex-col bg-neutral-100 dark:bg-neutral-950">
      <h1>h1 Titulo</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, suscipit! Ea perspiciatis, aperiam impedit
        velit in, quam eius dolorem quod atque vero sint iste placeat laboriosam! Vel facilis dolorum illo.
      </p>
      <h2>h2 Titulo</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, suscipit! Ea perspiciatis, aperiam impedit
        velit in, quam eius dolorem quod atque vero sint iste placeat laboriosam! Vel facilis dolorum illo.
      </p>
      <h3>h3 Titulo</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, suscipit! Ea perspiciatis, aperiam impedit
        velit in, quam eius dolorem quod atque vero sint iste placeat laboriosam! Vel facilis dolorum illo.
      </p>
      <h4>h4 Titulo</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, suscipit! Ea perspiciatis, aperiam impedit
        velit in, quam eius dolorem quod atque vero sint iste placeat laboriosam! Vel facilis dolorum illo.
      </p>
      <h5>h5 Titulo</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, suscipit! Ea perspiciatis, aperiam impedit
        velit in, quam eius dolorem quod atque vero sint iste placeat laboriosam! Vel facilis dolorum illo.
      </p>
      <h6>h6 Titulo</h6>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, suscipit! Ea perspiciatis, aperiam impedit
        velit in, quam eius dolorem quod atque vero sint iste placeat laboriosam! Vel facilis dolorum illo.
      </p>
      <Input placeholder="input" />
      <Button text="Abrir modal" onClick={() => setIsModalExitOpen(true)} />
      <div className="flex flex-row gap-4 flex-wrap">
        <Tag texto="pontos" tipo="pontos" />
        <Tag texto="erros" tipo="erros" />
        <Tag texto="anterior" tipo="anterior" />
        <Tag texto="seconds" tipo="time" />
      </div>
      {isModalExitOpen && (
        <Modal>
          <h2>Tem certeza?</h2>
          <p className="mt-2">
            <strong>Acertos</strong>: pontos
          </p>
          <p className="mt-2">
            <strong>Erros</strong>: erros
          </p>
          <p className="mt-2">
            <strong>Tempo</strong>: seconds
          </p>
          <div className="flex flex-row gap-4">
            <button
              className="mt-4 px-4 py-2 w-full bg-green-500 text-white rounded-md hover:bg-green-600 hover:font-bold"
              onClick={() => setIsModalExitOpen(false)}>
              {' '}
              Cancelar
            </button>
            <button
              className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded-md hover:bg-red-600 hover:font-bold"
              onClick={() => setIsModalExitOpen(false)}>
              Confirmar
            </button>
          </div>
        </Modal>
      )}
      <Card
        title="titulo"
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, unde labore iusto neque maxime recusandae adipisci magnam nihil quisquam similique. Possimus laudantium, aspernatur odio in quae nobis nam earum saepe?"
      />
    </main>
  );
}
