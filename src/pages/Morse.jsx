import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { ChevronDown, Settings } from 'lucide-react';
import Transition from '../components/Transition';
import { Modal } from '../components/Modal';
import Return from '../components/Return';

export default function Morse() {
  const [calcMode, setCalcMode] = useState(() => {
    return localStorage.getItem('modeValue') || 'points';
  });

  const [speedInputValue, setSpeedInputValue] = useState(() => {
    return localStorage.getItem('speedValue') || 10;
  });

  const [calcTime, setCalcTime] = useState(() => {
    return localStorage.getItem('timerValue') || '1m';
  });

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('modeValue', calcMode.toString());
    localStorage.setItem('speedValue', speedInputValue.toString());
    localStorage.setItem('timerValue', calcTime.toString());
  }, [calcMode, speedInputValue, calcTime]);

  const calcSpeedStorage = (event) => {
    localStorage.setItem('speedValue', event.target.value);

    setSpeedInputValue(event.target.value);
  };

  const CalcTimeToggle = () => {
    let handleChange = (event) => {
      setCalcTime(event.target.value);
    };

    return (
      <div className="w-full relative flex flex-row justify-center items-center">
        <ChevronDown className="absolute right-4 text-textAlt pointer-events-none" />
        <select
          className="appearance-none actionDefault w-full h-12 rounded-sm cursor-pointer font-semibold text-center select-none"
          value={calcTime}
          onChange={handleChange}>
          <option value="30s">30 segundos</option>
          <option value="1m">1 minuto</option>
          <option value="5m">5 minutos</option>
          <option value="10m">10 minutos</option>
          <option value="30m">30 minutos</option>
          <option value="infinito">Sem limite</option>
        </select>
      </div>
    );
  };

  const LinkCalc = ({ text, type }) => {
    let modeSelect = () => {
      if (calcMode === 'timer') {
        return navigate(`/morse/${type}/${calcMode}/${calcTime}`);
      }

      return navigate(`/morse/${type}/${calcMode}/${speedInputValue}`);
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
    <Transition className="flex flex-col justify-center items-center gap-4">
      <Return text="Código Morse (beta)" url="/" onClick={() => navigate('/')} />
      <ul className="w-full flex flex-row justify-center items-center rounded-md font-semibold select-none">
        <li
          className={`${calcMode === 'points' ? 'bg-primary text-neutral-100 cursor-default' : 'text-text bg-foreground'} w-full h-12 flex justify-center items-center rounded-l-md text-center cursor-pointer`}
          onClick={() => setCalcMode('points')}>
          Pontuação
        </li>
        <li
          className={`${calcMode === 'timer' ? 'bg-primary text-neutral-100 cursor-default' : 'text-text bg-foreground'} w-full h-12 flex justify-center items-center rounded-r-md text-center cursor-pointer`}
          onClick={() => setCalcMode('timer')}>
          Tempo
        </li>
      </ul>
      <Button variant="primary" onClick={() => setModal(!modal)}>
        <Settings /> Configuração do gerador
      </Button>
      <Modal.Root isOpen={modal}>
        <Modal.Title>Configuração</Modal.Title>
        <Modal.Content className="flex flex-col gap-4">
          <div className="space-y-2">
            {calcMode === 'points' ? (
              <>
                <h4>Pontuação máxima</h4>
                <Input value={speedInputValue} onChange={calcSpeedStorage} placeholder="Valor..." type="number" />
              </>
            ) : (
              <>
                <h4>Tempo máximo</h4>
                <CalcTimeToggle />
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
            <LinkCalc text="Palavra para Morse" type="toMorse" />
            <LinkCalc text="Morse para Palavra" type="toTxt" />
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
    </Transition>
  );
}
