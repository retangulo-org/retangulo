import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { Select } from '../components/Select';
import Input from '../components/Input';

export default function Home() {
  const [mathModal, setMathModal] = useState(false);
  const [type, setType] = useState('soma');
  const [time, setTime] = useState('1m');
  const [max, setMax] = useState(100);
  const [negative, setNegative] = useState('only-positive');

  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full flex flex-col bg-foreground border-4 border-foreground rounded-3xl">
          <div className="bg-[url('/src/assets/math_light.png')] dark:bg-[url('/src/assets/math_dark.png')] aspect-square bg-center bg-contain bg-origin-border bg-no-repeat rounded-t-3xl"></div>
          <div className="p-4">
            <div className="mb-4">
              <h2 className="m-0 p-0">Matemática</h2>
              <p className="m-0 p-0">Gere cálculos matemáticos aleatórios.</p>
            </div>
            <div className="w-full flex flex-row gap-4">
              <Button
                variant="primary"
                onClick={() => navigate(`/gerador?type=${type}&time=${time}&max=${max}&negative=${negative}`)}>
                Iniciar
              </Button>
              <Button variant="primary" onClick={() => setMathModal(!mathModal)} size="icon">
                <Settings />
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col bg-foreground border-4 border-foreground rounded-3xl">
          <div className="bg-[url('/src/assets/math_light.png')] dark:bg-[url('/src/assets/math_dark.png')] aspect-square bg-center bg-contain bg-origin-border bg-no-repeat rounded-t-3xl"></div>
          <div className="p-4">
            <div className="mb-4">
              <h2 className="m-0 p-0">Morse</h2>
              <p className="m-0 p-0">Gere códigos morse aleatórios.</p>
            </div>
            <div className="w-full flex flex-row gap-4">
              <Button variant="primary">Em breve</Button>
              <Button variant="primary" size="icon">
                <Settings />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal.Root isOpen={mathModal}>
        <Modal.Content>
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="mb-2">Tempo máximo</h4>
              <Select.Root
                value={time}
                onChange={(event) => {
                  setTime(event.target.value);
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
              <h4 className="mt-4 mb-2">Modos</h4>
              <div className="flex flex-row gap-2 p-2 overflow-x-scroll border-2 border-foreground bg-foreground shadow-inner rounded-md">
                {[
                  ['Adição', 'soma'],
                  ['Subtração', 'subt'],
                  ['Multiplicação', 'mult'],
                  ['Divisão', 'divi'],
                  ['Raiz Quadrada', 'raiz2'],
                  ['Expoente 2', 'expo2'],
                  ['Expoente 3', 'expo3'],
                  ['Maior', 'maior'],
                  ['Menor', 'menor'],
                ].map(([title, arit]) => (
                  <Button
                    key={arit}
                    variant={type === arit ? 'primary' : 'outline'}
                    onClick={() => {
                      setType(arit);
                    }}>
                    {title}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mt-4 mb-2">Valor máximo</h4>
              <Input
                value={max}
                onChange={(e) => {
                  setMax(e.target.value);
                }}
                id="valor-maximo"
                name="valor-maximo"
                type="number"
                inputMode="numeric"
                placeholder="Valor..."
              />
            </div>
            <div>
              <h4 className="mt-4 mb-2">Positivo ou negativo</h4>
              <div className="flex flex-row gap-2 p-2 overflow-x-auto border-2 border-foreground bg-foreground shadow-inner rounded-md">
                {[
                  ['Apenas positivo', 'only-positive'],
                  ['Aleatório', 'random-negative'],
                  ['Apenas negativo', 'only-negative'],
                ].map(([title, key]) => (
                  <Button
                    key={key}
                    variant={negative === key ? 'primary' : 'outline'}
                    onClick={() => {
                      setNegative(key);
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
