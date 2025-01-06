import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { Settings } from 'lucide-react';
import { Modal } from '../components/Modal';
import Return from '../components/Return';
import { Select } from '../components/Select';

export default function Morse() {
  const [morseMode, setMorseMode] = useState(() => {
    return localStorage.getItem('modeValue') || 'points';
  });

  const [speedInputValue, setSpeedInputValue] = useState(() => {
    return localStorage.getItem('speedValue') || 10;
  });

  const [morseTime, setMorseTime] = useState(() => {
    return localStorage.getItem('timerValue') || '1m';
  });

  const [morseTranslate, setMorseTranslate] = useState(() => {
    return localStorage.getItem('translateValue') || 'toMorse';
  });

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('modeValue', morseMode.toString());
    localStorage.setItem('speedValue', speedInputValue.toString());
    localStorage.setItem('timerValue', morseTime.toString());
    localStorage.setItem('translateValue', morseTranslate.toString());
  }, [morseMode, speedInputValue, morseTime, morseTranslate]);

  const calcSpeedStorage = (event) => {
    localStorage.setItem('speedValue', event.target.value);
    setSpeedInputValue(event.target.value);
  };

  const LinkCalc = ({ text, type }) => {
    let modeSelect = () => {
      if (morseMode === 'timer') {
        return navigate(`/morse/${type}/${morseTranslate}/${morseMode}/${morseTime}`);
      }

      if (morseMode === 'points') {
        return navigate(`/morse/${type}/${morseTranslate}/${morseMode}/${speedInputValue}`);
      }
    };

    return (
      <Button
        onClick={() => {
          modeSelect();
        }}>
        {text}
      </Button>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Return text="Código Morse (beta)" url="/" onClick={() => navigate('/')} />
      <div className="w-full flex flex-row justify-center items-center gap-4 rounded-md font-semibold select-none">
        <Button variant={morseMode === 'points' ? 'primary' : 'outline'} onClick={() => setMorseMode('points')}>
          Pontuação
        </Button>
        <Button variant={morseMode === 'timer' ? 'primary' : 'outline'} onClick={() => setMorseMode('timer')}>
          Tempo
        </Button>
      </div>
      <div className="w-full flex flex-row justify-center items-center gap-4 rounded-md font-semibold select-none">
        <Button
          variant={morseTranslate === 'toMorse' ? 'primary' : 'outline'}
          onClick={() => setMorseTranslate('toMorse')}>
          Texto Para Morse
        </Button>
        <Button variant={morseTranslate === 'toTxt' ? 'primary' : 'outline'} onClick={() => setMorseTranslate('toTxt')}>
          Morse Para Texto
        </Button>
      </div>
      <Button variant="primary" onClick={() => setModal(!modal)}>
        <Settings /> Configuração do gerador
      </Button>
      <Modal.Root isOpen={modal}>
        <Modal.Title>Configuração</Modal.Title>
        <Modal.Content className="flex flex-col gap-4">
          <div className="space-y-2">
            {morseMode === 'points' ? (
              <>
                <h4>Pontuação máxima</h4>
                <Input value={speedInputValue} onChange={calcSpeedStorage} placeholder="Valor..." type="number" />
              </>
            ) : (
              <>
                <h4>Tempo máximo</h4>
                <Select.Root value={morseTime} onChange={(event) => setMorseTime(event.target.value)}>
                  <Select.Content value="30s" option="30 segundos" />
                  <Select.Content value="1m" option="1 minuto" />
                  <Select.Content value="5m" option="5 minutos" />
                  <Select.Content value="10m" option="10 minutos" />
                  <Select.Content value="30m" option="30 minutos" />
                  <Select.Content value="infinito" option="Sem limite" />
                </Select.Root>
              </>
            )}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="danger"
            onClick={() => {
              setModal(!modal);
            }}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal.Root>
      <div className="w-full flex flex-col gap-4 text-center">
        <div className="w-full p-4 bg-foreground rounded-md space-y-4">
          <h4>Palavras</h4>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <LinkCalc text="Palavra" type="word" />
            <LinkCalc text="Letras" type="alphabet" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <table>
          <thead>
            <tr>
              <th>Caractere</th>
              <th>Código Morse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
              <td>.-</td>
            </tr>
            <tr>
              <td>b</td>
              <td>-...</td>
            </tr>
            <tr>
              <td>c</td>
              <td>-.-.</td>
            </tr>
            <tr>
              <td>d</td>
              <td>-..</td>
            </tr>
            <tr>
              <td>e</td>
              <td>.</td>
            </tr>
            <tr>
              <td>f</td>
              <td>..-.</td>
            </tr>
            <tr>
              <td>g</td>
              <td>--.</td>
            </tr>
            <tr>
              <td>h</td>
              <td>....</td>
            </tr>
            <tr>
              <td>i</td>
              <td>..</td>
            </tr>
            <tr>
              <td>j</td>
              <td>.---</td>
            </tr>
            <tr>
              <td>k</td>
              <td>-.-</td>
            </tr>
            <tr>
              <td>l</td>
              <td>.-..</td>
            </tr>
            <tr>
              <td>m</td>
              <td>--</td>
            </tr>
            <tr>
              <td>n</td>
              <td>-.</td>
            </tr>
            <tr>
              <td>o</td>
              <td>---</td>
            </tr>
            <tr>
              <td>p</td>
              <td>.--.</td>
            </tr>
            <tr>
              <td>q</td>
              <td>--.-</td>
            </tr>
            <tr>
              <td>r</td>
              <td>.-.</td>
            </tr>
            <tr>
              <td>s</td>
              <td>...</td>
            </tr>
            <tr>
              <td>t</td>
              <td>-</td>
            </tr>
            <tr>
              <td>u</td>
              <td>..-</td>
            </tr>
            <tr>
              <td>v</td>
              <td>...-</td>
            </tr>
            <tr>
              <td>w</td>
              <td>.--</td>
            </tr>
            <tr>
              <td>x</td>
              <td>-..-</td>
            </tr>
            <tr>
              <td>y</td>
              <td>-.--</td>
            </tr>
            <tr>
              <td>z</td>
              <td>--..</td>
            </tr>
            <tr>
              <td>0</td>
              <td>-----</td>
            </tr>
            <tr>
              <td>1</td>
              <td>.----</td>
            </tr>
            <tr>
              <td>2</td>
              <td>..---</td>
            </tr>
            <tr>
              <td>3</td>
              <td>...--</td>
            </tr>
            <tr>
              <td>4</td>
              <td>....-</td>
            </tr>
            <tr>
              <td>5</td>
              <td>.....</td>
            </tr>
            <tr>
              <td>6</td>
              <td>-....</td>
            </tr>
            <tr>
              <td>7</td>
              <td>--...</td>
            </tr>
            <tr>
              <td>8</td>
              <td>---..</td>
            </tr>
            <tr>
              <td>9</td>
              <td>----.</td>
            </tr>
            <tr>
              <td>.</td>
              <td>.-.-.-</td>
            </tr>
            <tr>
              <td>,</td>
              <td>--..--</td>
            </tr>
            <tr>
              <td>?</td>
              <td>..--..</td>
            </tr>
            <tr>
              <td>&#39;</td>
              <td>.----.</td>
            </tr>
            <tr>
              <td>!</td>
              <td>-.-.--</td>
            </tr>
            <tr>
              <td>(</td>
              <td>-.--.</td>
            </tr>
            <tr>
              <td>)</td>
              <td>-.--.-</td>
            </tr>
            <tr>
              <td>&amp;</td>
              <td>.-...</td>
            </tr>
            <tr>
              <td>:</td>
              <td>---...</td>
            </tr>
            <tr>
              <td>;</td>
              <td>-.-.-.</td>
            </tr>
            <tr>
              <td>=</td>
              <td>-...-</td>
            </tr>
            <tr>
              <td>+</td>
              <td>.-.-.</td>
            </tr>
            <tr>
              <td>-</td>
              <td>-....-</td>
            </tr>
            <tr>
              <td>_</td>
              <td>..--.-</td>
            </tr>
            <tr>
              <td>&quot;</td>
              <td>.-..-.</td>
            </tr>
            <tr>
              <td>$</td>
              <td>...-..-</td>
            </tr>
            <tr>
              <td>@</td>
              <td>.--.-.</td>
            </tr>
            <tr>
              <td>(espaço)</td>
              <td>/</td>
            </tr>
            <tr>
              <td>/</td>
              <td>(espaço)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>lorem ipsum = .-.. --- .-. . -- / .. .--. ... ..- --</p>
    </div>
  );
}
