import React from 'react';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import ThemeToggle from '../components/Theme/ThemeToggle';
import Transition from '../components/Transition';

const links = [
  { title: 'Contato', url: 'mailto:contato@retangulo.org' },
  { title: 'Preview', url: 'https://dev.retangulo.pages.dev/' },
  { title: 'Github', url: 'https://github.com/retangulo-org' },
  { title: 'To-do', url: 'https://github.com/orgs/Retangulo-org/projects/1/views/1' },
  { title: 'MySaas', url: 'https://mysaas.crom.live/saas/19' }
]

export default function Options() {
  return (
    <Transition className="flex flex-col justify-center items-center">
      <div className="w-full divide-neutral-200 dark:divide-neutral-800 divide-y-2">
        <div className="w-full py-2 flex flex-row justify-between items-center">
          <h3 className="mb-0 !text-text">Tema</h3>
          <ThemeToggle />
        </div>
        <div className="w-full py-2 flex flex-row justify-between items-center">
          <h3 className="mb-0 !text-text">Limpar cache</h3>
          <Button
            size="icon"
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
    </Transition>
  );
}
