import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
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
                <h6 className="pr-10">
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
                  ['Numérico', 'number'],
                  ['Normal', 'text'],
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
      </div>
    </Meta>
  );
}
