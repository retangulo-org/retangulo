import { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import { Generator } from '../components/Generator';
import { RandomMath } from '../scripts/randomMath';
import Button from '../components/ui/Button';
import { Settings } from 'lucide-react';
import { Modal } from '../components/Modal';
import { Select } from '../components/Select';
import Input from '../components/ui/Input';

export default function Home() {
  const [mathModal, setMathModal] = useState(false);
  const [mathType, setMathType] = useState(() => {
    return localStorage.getItem('mathType') || 'soma';
  });
  const [mathTime, setMathTime] = useState(() => {
    return localStorage.getItem('mathTime') || '1m';
  });
  const [mathMax, setMathMax] = useState(() => {
    return localStorage.getItem('mathMax') || 100;
  });
  const [mathSize, setMathSize] = useState(() => {
    return localStorage.getItem('mathSize') || 2;
  });
  const [mathInt, setMathInt] = useState(() => {
    return localStorage.getItem('mathInt') || 'positive';
  });

  useEffect(() => {
    localStorage.setItem('mathType', mathType);
    localStorage.setItem('mathTime', mathTime);
    localStorage.setItem('mathMax', mathMax);
    localStorage.setItem('mathSize', mathSize);
    localStorage.setItem('mathInt', mathInt);
  }, [mathType, mathTime, mathMax, mathSize, mathInt]);

  useEffect(() => {
    if (mathMax > 100000) {
      alert('Valor máximo muito grande! Pode travar seu dispositivo.');
      setMathMax(100000);
    }

    if (mathSize > 50) {
      alert('Quantidade de termos muito grande! Pode travar seu dispositivo.');
      setMathSize(50);
    }
  }, [mathMax, mathSize]);

  const [random, setRandom] = useState(() => RandomMath(mathSize, mathMax, mathInt, mathType));
  const [change, setChange] = useState(true);

  useEffect(() => {
    setRandom(() => RandomMath(mathSize, mathMax, mathInt, mathType));
  }, [change]);

  const changeChar = random.map((char) => {
    switch (char.toString()) {
      case '*':
        return '×';
      case '/':
        return '÷';
      default:
        return char;
    }
  });

  return (
    <Meta title="Gerador de Cálculos Matemáticos — Retangulo.org" canonical="https://retangulo.org/">
      <Button variant="outline" className="mb-4" onClick={() => setMathModal(!mathModal)}>
        Configurações do Gerador <Settings />
      </Button>
      <Generator.Root
        math
        time={mathTime}
        output={changeChar}
        result={eval(random.join(''))}
        onRegenerate={() => setChange(!change)}>
        <Generator.Output />
        <Generator.Tags />
        <Generator.Input />
        <Generator.Confirm />
        <Generator.History />
        <Generator.Score />
      </Generator.Root>
      <Modal.Root isOpen={mathModal}>
        <Modal.Content>
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="mb-2">Tempo limite</h4>
              <Select.Root
                value={mathTime}
                onChange={(event) => {
                  setMathTime(event.target.value);
                }}>
                {[
                  ['15 segundos', '15s'],
                  ['30 segundos', '30s'],
                  ['1 minuto', '1m'],
                  ['5 minutos', '5m'],
                  ['10 minutos', '10m'],
                  ['30 minutos', '30m'],
                  ['Sem limite', 'infinito'],
                ].map(([tempo_title, tempo]) => (
                  <Select.Content value={tempo} option={tempo_title} />
                ))}
              </Select.Root>
            </div>
            <div>
              <h4 className="mt-4 mb-2">Operacões</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {[
                  ['Adição', 'soma'],
                  ['Subtração', 'subt'],
                  ['Multiplicação', 'mult'],
                  ['Divisão', 'divi'],
                ].map(([title, arit]) => (
                  <Button
                    key={arit}
                    size={'default'}
                    variant={mathType === arit ? 'primary' : 'outline'}
                    onClick={() => {
                      setMathType(arit);
                    }}>
                    {title}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mt-4 mb-2">Valor máximo</h4>
              <Input
                value={mathMax}
                onChange={(e) => {
                  setMathMax(e.target.value);
                }}
                id="valor-maximo"
                name="valor-maximo"
                type="number"
                inputMode="numeric"
                placeholder="Valor..."
              />
            </div>
            <div>
              <h4 className="mt-4 mb-2">Quantidade de termos</h4>
              <Input
                value={mathSize}
                onChange={(e) => {
                  setMathSize(e.target.value);
                }}
                id="tamanho-maximo"
                name="tamanho-maximo"
                type="number"
                inputMode="numeric"
                placeholder="Valor..."
              />
            </div>
            <div>
              <h4 className="mt-4 mb-2">Tipo de valores</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {[
                  ['Apenas positivos', 'positive'],
                  ['Aleatórios', 'random'],
                  ['Apenas negativos', 'negative'],
                ].map(([title, key]) => (
                  <Button
                    key={key}
                    size={'default'}
                    variant={mathInt === key ? 'primary' : 'outline'}
                    onClick={() => {
                      setMathInt(key);
                    }}>
                    {title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="danger"
            onClick={() => {
              setMathModal(false);
              setChange(!change);
            }}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal.Root>
    </Meta>
  );
}
