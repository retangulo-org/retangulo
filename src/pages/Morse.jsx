import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';
import { Generator } from '../components/Generator';
import { retmorse } from 'retmorse';
import { RandomMorse } from '../scripts/randomMorse';

export default function Morse() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const requiredParams = ['type', 'time', 'trans'];
    const missingParam = requiredParams.find((param) => !searchParams.get(param));

    if (missingParam) {
      navigate('/');
    }
  }, [searchParams, navigate]);

  const params = {
    type: searchParams.get('type'),
    time: searchParams.get('time'),
    trans: searchParams.get('trans'),
  };

  const [random, setRandom] = useState(RandomMorse(params.type));
  const [change, setChange] = useState(true);

  useEffect(() => {
    setRandom(RandomMorse(params.type));
  }, [change]);

  return (
    <Meta
      title="Código Morse — Gerador de Cálculos Matemáticos — Retangulo.org"
      canonical="https://retangulo.org/morse">
      <Generator.Root
        time={params.time}
        output={params.trans === 'toTxt' ? retmorse.toMorse(random) : random}
        result={params.trans === 'toTxt' ? random : retmorse.toMorse(random)}
        onRegenerate={() => setChange(!change)}>
        <Generator.Back title="Código Morse" />
        <Generator.Output />
        <Generator.Tags />
        <Generator.Input notNumber />
        <Generator.Confirm />
        <Generator.History />
        <Generator.Score />
      </Generator.Root>
    </Meta>
  );
}
