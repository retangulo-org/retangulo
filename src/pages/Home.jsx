import Meta from '../components/Meta';
import { Generator } from '../components/Generator';

export default function Home() {
  return (
    <Meta title="Gerador de Cálculos Matemáticos — Retangulo.org" canonical="https://retangulo.org/">
      <Generator.Root math>
        <Generator.Modal />
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
