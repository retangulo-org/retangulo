import React from 'react';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import ThemeToggle from '../components/Theme/ThemeToggle';

const links = [
  { title: 'Contato', url: 'mailto:contato@retangulo.org' },
  { title: 'Preview', url: 'https://dev.retangulo.org/' },
  { title: 'Github', url: 'https://github.com/retangulo-org' },
];

export default function Options() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full divide-neutral-200 dark:divide-neutral-800 divide-y-2">
        <div className="w-full py-2 flex flex-row justify-between items-center">
          <h3 className="mb-0 !text-text">Tema</h3>
          <ThemeToggle />
        </div>
        <div className="w-full py-2 flex flex-row justify-between items-center">
          <h3 className="mb-0 !text-text">Limpar cache</h3>
          <Button
            size="icon"
            name="Limpar cache"
            onClick={() => {
              localStorage.clear();
              window.location.href = window.location.href;
            }}>
            <Trash2 />
          </Button>
        </div>
      </div>
      <h2 className="mt-8">Links</h2>
      <div className="w-full divide-neutral-200 dark:divide-neutral-800 divide-y-2">
        {links.map((link) => (
          <div className="w-full flex flex-row justify-between items-center">
            <a
              className="w-full py-2 flex flex-row justify-between items-center hover:underline underline-offset-4 text-text"
              href={link.url}
              target="_blank">
              <h3 className="!text-text">{link.title}</h3>
              <ArrowUpRight className="w-8 h-8 text-text" />
            </a>
          </div>
        ))}
      </div>
      <p className="text-text mt-4">
        Desenvolvido por{' '}
        <a
          className="text-blue-500 font-bold hover:underline hover:underline-offset-4"
          href="https://leydsonandrey.github.io">
          Leydson Andrey
        </a>{' '}
        🌴
      </p>
    </div>
  );
}
