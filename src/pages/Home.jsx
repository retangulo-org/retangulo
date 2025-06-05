import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Settings } from 'lucide-react';
import { Modal } from '../components/Modal';
import { Select } from '../components/Select';
import Input from '../components/ui/Input';

function Math() {
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

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('mathType', mathType);
    localStorage.setItem('mathTime', mathTime);
    localStorage.setItem('mathMax', mathMax);
    localStorage.setItem('mathSize', mathSize);
    localStorage.setItem('mathInt', mathInt);
  }, [mathType, mathTime, mathMax, mathSize, mathInt]);

  return (
    <>
      <div className="w-full flex flex-col bg-foreground border-4 border-foreground rounded-xl">
        <div className="p-4">
          <div className="mb-8">
            <h2 className="m-0 p-0">Matemática básica</h2>
            <p className="m-0 p-0">Gere cálculos matemáticos aleatórios.</p>
          </div>
          <div className="w-full flex flex-row gap-4">
            <Button
              variant="primary"
              onClick={() =>
                navigate(`/math?type=${mathType}&time=${mathTime}&max=${mathMax}&int=${mathInt}&size=${mathSize}`)
              }>
              Iniciar
            </Button>
            <Button variant="primary" onClick={() => setMathModal(!mathModal)} size="icon">
              <Settings />
            </Button>
          </div>
        </div>
      </div>
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
              <div className="flex flex-row gap-2 p-2 overflow-x-scroll border-2 border-foreground bg-foreground shadow-inner rounded-md">
                {[
                  ['Adição', 'soma'],
                  ['Subtração', 'subt'],
                  ['Multiplicação', 'mult'],
                  ['Divisão', 'divi'],
                ].map(([title, arit]) => (
                  <Button
                    key={arit}
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
              <div className="flex flex-row gap-2 p-2 overflow-x-auto border-2 border-foreground bg-foreground shadow-inner rounded-md">
                {[
                  ['Apenas positivos', 'positive'],
                  ['Aleatórios', 'random'],
                  ['Apenas negativos', 'negative'],
                ].map(([title, key]) => (
                  <Button
                    key={key}
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
            }}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal.Root>
    </>
  );
}

function Morse() {
  const [morseModal, setMorseModal] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col bg-foreground border-4 border-foreground rounded-xl">
        <div className="p-4">
          <div className="mb-8">
            <h2 className="m-0 p-0">Morse</h2>
            <p className="m-0 p-0">Gere código morse aleatórios e traduza-os.</p>
          </div>
          <div className="w-full flex flex-row gap-4">
            <Button variant="primary" onClick={() => setMorseModal(true)}>
              Em breve
            </Button>
            <Button variant="primary" size="icon" onClick={() => setMorseModal(true)}>
              <Settings />
            </Button>
          </div>
        </div>
      </div>
      <Modal.Root isOpen={morseModal} center>
        <Modal.Content>Estará modo estará disponível em breve.</Modal.Content>
        <Modal.Actions>
          <Button
            variant="danger"
            onClick={() => {
              setMorseModal(false);
            }}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal.Root>
    </>
  );
}

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Math />
        <Morse />
      </div>
    </>
  );
}
