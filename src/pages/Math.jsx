import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';
import { Generator } from '../components/Generator';
import { RandomMath } from '../scripts/randomMath';

export default function Math() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const requiredParams = ['type', 'time', 'max', 'int', 'size'];
    const missingParam = requiredParams.find((param) => !searchParams.get(param));

    if (missingParam) {
      navigate('/');
    }
  }, [searchParams, navigate]);

  const params = {
    type: searchParams.get('type'),
    time: searchParams.get('time'),
    max: Number(searchParams.get('max')),
    int: searchParams.get('int'),
    size: Number(searchParams.get('size')),
  };

  const [random, setRandom] = useState(() => RandomMath(params.size, params.max, params.int, params.type));
  const [change, setChange] = useState(true);

  useEffect(() => {
    setRandom(() => RandomMath(params.size, params.max, params.int, params.type));
  }, [change]);

  const changeChar = random.map((char) => {
    switch (char.toString()) {
      case '*':
        return '×';
      case '/':
        return '÷';
      default:
        return char;
    }
  });

  return (
    <Meta
      title="Matemática Básica — Gerador de Cálculos Matemáticos — Retangulo.org"
      canonical="https://retangulo.org/math">
      <Generator.Root
        math
        time={params.time}
        output={changeChar}
        result={eval(random.join(''))}
        onRegenerate={() => setChange(!change)}>
        <Generator.Back title="Matemática Básica" />
        <Generator.Output />
        <Generator.Tags />
        <Generator.Input />
        <Generator.Confirm />
        <Generator.History />
        <Generator.Score />
      </Generator.Root>
    </Meta>
  );
}
