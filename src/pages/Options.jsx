import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import { Card } from '../components/Card/index';
import ThemeToggle from '../components/Theme/ThemeToggle';

export default function Options() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full divide-neutral-200 dark:divide-neutral-800 divide-y-2">
        <div className="w-full py-2 flex flex-row justify-between items-center">
          <h3 className="mb-0">Tema</h3>
          <ThemeToggle />
        </div>
        <div className="w-full py-2 flex flex-row justify-between items-center">
          <h3 className="mb-0">Limpar cache</h3>
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
      <div className="w-full mt-12 flex flex-row justify-center flex-wrap gap-4 text-text">
        <span>
          <a
            className="flex flex-row justify-center items-center gap-2 hover:underline underline-offset-4"
            href="https://github.com/retangulo-org"
            target="_blank">
            Github
            <ExternalLink />
          </a>
        </span>
        <span>
          <a
            className="flex flex-row justify-center items-center gap-2 hover:underline underline-offset-4"
            href="mailto:contato@retangulo.org"
            target="_blank">
            Contato
            <ExternalLink />
          </a>
        </span>
        <span>
          <a
            className="flex flex-row justify-center items-center gap-2 hover:underline underline-offset-4"
            href="https://dev.retangulo.pages.dev/"
            target="_blank">
            Preview
            <ExternalLink />
          </a>
        </span>
        <span>
          <a
            className="flex flex-row justify-center items-center gap-2 hover:underline underline-offset-4"
            href="https://github.com/orgs/Retangulo-org/projects/1/views/1"
            target="_blank">
            To-do
            <ExternalLink />
          </a>
        </span>
        <span>
          <a
            className="flex flex-row justify-center items-center gap-2 hover:underline underline-offset-4"
            href="https://mysaas.crom.live/saas/19"
            target="_blank">
            MySaas
            <ExternalLink />
          </a>
        </span>
      </div>
    </div>
  );
}
