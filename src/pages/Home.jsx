import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';
import Button from '../components/ui/Button';
import { Settings } from 'lucide-react';
import { Modal } from '../components/Modal';
import { Select } from '../components/Select';
import Input from '../components/ui/Input';

function Card({ title, desc, initFun, settingsFun }) {
  return (
    <div className="w-full flex flex-col glass rounded-xl">
      <div className="p-4">
        <div className="mb-8">
          <h2 className="m-0 p-0">{title}</h2>
          <p className="m-0 p-0">{desc}</p>
        </div>
        <div className="w-full flex flex-row gap-4">
          <Button variant="primary" onClick={initFun}>
            Iniciar
          </Button>
          <Button variant="default" onClick={settingsFun} size="icon">
            <Settings />
          </Button>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <>
      <Card
        title="Matemática básica"
        desc="Gere cálculos matemáticos aleatórios."
        initFun={() =>
          navigate(`/math?type=${mathType}&time=${mathTime}&max=${mathMax}&int=${mathInt}&size=${mathSize}`)
        }
        settingsFun={() => setMathModal(!mathModal)}
      />
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
  const [morseType, setMorseType] = useState(() => {
    return localStorage.getItem('morseType') || 'letter';
  });
  const [morseTime, setMorseTime] = useState(() => {
    return localStorage.getItem('morseTime') || '1m';
  });
  const [morseTrans, setMorseTrans] = useState(() => {
    return localStorage.getItem('morseTrans') || 'toMorse';
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('morseType', morseType);
    localStorage.setItem('morseTime', morseTime);
    localStorage.setItem('morseTrans', morseTrans);
  }, [morseType, morseTime, morseTrans]);

  return (
    <>
      <Card
        title="Código Morse"
        desc="Gere código morse aleatórios e traduza-os."
        initFun={() => navigate(`/morse?type=${morseType}&time=${morseTime}&trans=${morseTrans}`)}
        settingsFun={() => setMorseModal(true)}
      />
      <Modal.Root isOpen={morseModal} center>
        <Modal.Content>
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="mb-2">Tempo limite</h4>
              <Select.Root
                value={morseTime}
                onChange={(event) => {
                  setMorseTime(event.target.value);
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
              <h4 className="mt-4 mb-2">Tradução</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {[
                  ['Para texto', 'toTxt'],
                  ['Para morse', 'toMorse'],
                ].map(([title, arit]) => (
                  <Button
                    key={arit}
                    size={'default'}
                    variant={morseTrans === arit ? 'primary' : 'outline'}
                    onClick={() => {
                      setMorseTrans(arit);
                    }}>
                    {title}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mt-4 mb-2">Modos</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {[
                  ['Letras', 'letter'],
                  ['Palavras', 'word'],
                ].map(([title, arit]) => (
                  <Button
                    key={arit}
                    size={'default'}
                    variant={morseType === arit ? 'primary' : 'outline'}
                    onClick={() => {
                      setMorseType(arit);
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
    <Meta title="Gerador de Cálculos Matemáticos — Retangulo.org" canonical="https://retangulo.org/">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Math />
        <Morse />
      </div>
    </Meta>
  );
}
