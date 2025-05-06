import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Generator } from '../components/Generator';
import { RandomMath } from '../scripts/random';

export default function Teste() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if ([...searchParams].length === 0) {
      navigate('/');
    }
  }, [searchParams, navigate]);

  const params = {
    time: searchParams.get('time'),
    type: searchParams.get('type'),
    max: Number(searchParams.get('max')),
    int: searchParams.get('int'),
  };

  const [random, setRandom] = useState(() => RandomMath(2, params.max, params.int));
  const [change, setChange] = useState(true);

  useEffect(() => {
    setRandom(() => RandomMath(2, params.max, params.int));
  }, [change]);

  return (
    <Generator.Root
      time={params.time}
      output={random}
      result={eval(random.join(''))}
      onRegenerate={() => setChange(!change)}>
      <Generator.Back title="Matemática" />
      <Generator.Output />
      <Generator.Tags />
      <Generator.Input />
      <Generator.Confirm />
      <Generator.History />
      <Generator.Score />
    </Generator.Root>
  );
}
