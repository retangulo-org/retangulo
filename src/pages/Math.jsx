import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { Settings } from 'lucide-react';
import { Modal } from '../components/Modal';
import Return from '../components/Return';
import { Select } from '../components/Select';

export default function Math() {
  const [calcSizeInputValue, setCalcSizeInputValue] = useState(() => {
    return localStorage.getItem('calcSizeValue') || 100;
  });

  const [calcNegative, setCalcNegative] = useState(() => {
    return localStorage.getItem('calcNegative') || 'only-positive';
  });

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
    localStorage.setItem('calcSizeValue', calcSizeInputValue.toString());
    localStorage.setItem('calcNegative', calcNegative.toString());
    localStorage.setItem('modeValue', calcMode.toString());
    localStorage.setItem('speedValue', speedInputValue.toString());
    localStorage.setItem('timerValue', calcTime.toString());
  }, [calcNegative, calcSizeInputValue, calcMode, speedInputValue, calcTime]);

  const calcSizeStorage = (event) => {
    localStorage.setItem('calcSizeValue', event.target.value);
    setCalcSizeInputValue(event.target.value);
  };

  const calcSpeedStorage = (event) => {
    localStorage.setItem('speedValue', event.target.value);
    setSpeedInputValue(event.target.value);
  };

  const LinkCalc = ({ text, type }) => {
    const inputIsEmpty = () => {
      if (calcSizeInputValue === '' || speedInputValue === '') {
        return alert('Preencha todos os campo antes de continuar.');
      }

      if (calcMode === 'timer') {
        return navigate(`/math/${type}/${calcMode}/${calcTime}/${calcNegative}/${calcSizeInputValue}`);
      }

      return navigate(`/math/${type}/${calcMode}/${speedInputValue}/${calcNegative}/${calcSizeInputValue}`);
    };

    return (
      <Button
        onClick={() => {
          inputIsEmpty();
        }}>
        {text}
      </Button>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Return text="Matemática" url="/" onClick={() => navigate('/')} />
      <div className="w-full flex flex-row justify-center items-center gap-4 rounded-md font-semibold select-none">
        <Button variant={calcMode === 'points' ? 'primary' : 'outline'} onClick={() => setCalcMode('points')}>
          Pontuação
        </Button>
        <Button variant={calcMode === 'timer' ? 'primary' : 'outline'} onClick={() => setCalcMode('timer')}>
          Tempo
        </Button>
      </div>
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
                <Select.Root value={calcTime} onChange={(event) => setCalcTime(event.target.value)}>
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
          <div className="space-y-2">
            <h4>Valor máximo</h4>
            <Input value={calcSizeInputValue} onChange={calcSizeStorage} placeholder="Valor..." type="number" />
          </div>
          <div className="space-y-2">
            <h4>Positivo ou negativo</h4>
            <Select.Root value={calcNegative} onChange={(event) => setCalcNegative(event.target.value)}>
              <Select.Content value="only-positive" option="Apenas positivo" />
              <Select.Content value="random-negative" option="Aleatório" />
              <Select.Content value="only-negative" option="Apenas negativo" />
            </Select.Root>
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
          <h4>Aritmética</h4>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <LinkCalc text="Adição" type="soma" />
            <LinkCalc text="Subtração" type="subt" />
            <LinkCalc text="Multiplicação" type="mult" />
            <LinkCalc text="Divisão" type="divi" />
          </div>
        </div>
        <div className="w-full p-4 bg-foreground rounded-md space-y-4">
          <h4>Potenciação</h4>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <LinkCalc text="Raiz Quadrada" type="raiz2" />
            <LinkCalc text="Expoente 2" type="expo2" />
            <LinkCalc text="Expoente 3" type="expo3" />
          </div>
        </div>
        <div className="w-full p-4 bg-foreground rounded-md space-y-4">
          <h4>Comparação</h4>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <LinkCalc text="Maior" type="maior" />
            <LinkCalc text="Menor" type="menor" />
          </div>
        </div>
      </div>
    </div>
  );
}
