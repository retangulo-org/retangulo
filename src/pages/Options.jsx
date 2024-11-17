import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import { Card } from '../components/Card/index';
import ThemeToggle from '../components/Theme/ThemeToggle';

export default function Options() {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <Card.Root>
        <div className="w-full flex flex-row justify-between items-center gap-12 flex-nowrap">
          <Card.Header>
            <Card.Title>Alterar tema</Card.Title>
            <Card.Description>
              Alternar entre os modos claro e escuro do site, ou seguir a preferência do sistema, ajustando
              automaticamente o tema conforme a configuração do dispositivo para uma experiência visual mais integrada.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <ThemeToggle />
          </Card.Content>
        </div>
      </Card.Root>
      <Card.Root>
        <div className="w-full flex flex-row justify-between items-center gap-12 flex-nowrap">
          <Card.Header>
            <Card.Title>Limpar cache</Card.Title>
            <Card.Description>
              Remover completamente o cache do site, eliminando dados armazenados temporariamente para garantir que o
              conteúdo carregue com as informações mais atualizadas.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="bg-secundary p-2 rounded-md">
              <Button
                size="icon"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = window.location.href;
                }}>
                <Trash2 />
              </Button>
            </div>
          </Card.Content>
        </div>
      </Card.Root>
      <div className="flex flex-row justify-center flex-wrap gap-4 text-text">
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
