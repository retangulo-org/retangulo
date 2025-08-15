import Meta from '../components/Meta';
import { Generator } from '../components/Generator';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <Meta title={t('title')} canonical="https://retangulo.org/" desc={t('desc')}>
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
