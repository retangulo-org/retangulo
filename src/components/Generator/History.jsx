import { useContext } from 'react';
import { RootContext } from './Root';
import { Collapse } from '../Collapse';
import { Frown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function History() {
  const { storedArray } = useContext(RootContext);
  const { t } = useTranslation();

  return (
    <Collapse.Root>
      <Collapse.Toggle>{t('bHistory')}</Collapse.Toggle>
      <Collapse.Content>
        {storedArray[0] != '' &&
          storedArray.map((string, index) => (
            <p key={index} className="mb-0 font-semibold">
              {string}
            </p>
          ))}
        {storedArray[0] === '' && (
          <p className="mb-0 font-semibold flex flex-row items-center gap-2">
            {t('bHistoryEmpty')} <Frown />
          </p>
        )}
      </Collapse.Content>
    </Collapse.Root>
  );
}
