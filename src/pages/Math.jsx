import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Generator } from '../components/Generator';
import { RandomMath } from '../scripts/random';

export default function Math() {
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
    size: Number(searchParams.get('size')),
  };

  const [random, setRandom] = useState(() => RandomMath( params.size, params.max, params.int, params.type));
  const [change, setChange] = useState(true);

  useEffect(() => {
    setRandom(() => RandomMath(params.size, params.max, params.int, params.type));
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
      <Generator.Warning text="Modo em desenvolvimento. Pode aprensentar falhas." />
    </Generator.Root>
  );
}
