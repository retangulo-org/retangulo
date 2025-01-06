import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Home() {
  const navigate = useNavigate();

  const LinkCalc = ({ text, type }) => {
    return (
      <Button
        variant="primary"
        className="h-24 text-2xl"
        onClick={() => {
          navigate(`/${type}`);
        }}>
        {text}
      </Button>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-center my-8">Gerador de Cálculos Matemáticos e Código Morse</h1>
      <div className="w-full flex flex-col gap-4 text-center">
        <div className="w-full p-4 bg-foreground rounded-md space-y-4">
          <h4>Geradores</h4>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LinkCalc text="Matemática" type="math" />
            <LinkCalc text="Código Morse" type="morse" />
          </div>
        </div>
      </div>
    </div>
  );
}
