import { useState, useEffect } from 'react';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import { Select } from '../components/Select';
import Button from '../components/ui/Button';
import Meta from '../components/Meta';

export default function Options() {
  const [keyType, setKeyType] = useState(() => {
    return localStorage.getItem('keyType') || 'number';
  });

  useEffect(() => {
    localStorage.setItem('keyType', keyType);
  }, [keyType]);

  const links = [
    { id: 1, title: 'Contato', url: 'mailto:contato@retangulo.org' },
    { id: 2, title: 'Preview', url: 'https://dev.retangulo.org/' },
    { id: 3, title: 'Backup', url: 'https://alt.retangulo.org/' },
    { id: 4, title: 'Github', url: 'https://github.com/retangulo-org' },
  ];

  return (
    <Meta
      title={'Opções — Gerador de Cálculos Matemáticos — Retangulo.org'}
      canonical={'https://retangulo.org/options'}
      desc={'Resolva cálculos matemáticos aleatórios & melhore seu cálculo mental.'}>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full divide-foreground dark:divide-neutral-800 divide-y-2">
          <div className="w-full py-2 flex flex-col ">
            <div className="w-full pb-1 flex flex-row justify-between items-center">
              <div className="mb-0 flex flex-col">
                <h3 className="!text-text">
                  {'Teclado'} <span className="text-sm">({'Dispositivos móveis'})</span>
                </h3>
                <h6>
                  {
                    'Altera o tipo de teclado virtual: normal (teclado padrão) ou numérico. Alguns teclados numéricos não possuem o sinal de menos (-), isso impossibilita responder com números negativos.'
                  }
                </h6>
              </div>
              <Select.Root
                value={keyType}
                className="!w-auto"
                childrenClassName="!text-left !pl-4 !w-36"
                onChange={(event) => {
                  setKeyType(event.target.value);
                }}>
                {[
                  ['Normal', 'text'],
                  ['Numérico', 'number'],
                ].map(([key_title, key]) => (
                  <Select.Content value={key} option={key_title} />
                ))}
              </Select.Root>
            </div>
          </div>
          <div className="w-full py-2 flex flex-row justify-between items-center">
            <h3 className="mb-0 !text-text">{'Limpar cache'}</h3>
            <Button
              size="icon"
              variant="danger"
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
        <div className="w-full divide-foreground divide-y-2">
          {links.map((link) => (
            <div key={link.id} className="w-full flex flex-row justify-between items-center">
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
      </div>
    </Meta>
  );
}
