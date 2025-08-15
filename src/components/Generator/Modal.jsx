import { useContext } from 'react';
import { RootContext } from './Root';
import Button from '../ui/Button';
import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Modal() {
  const { setModal } = useContext(RootContext);
  const { t } = useTranslation();

  return (
    <Button variant="outline" classname="mb-4" onClick={() => setModal(true)}>
      {t('bConfigGen')} <Settings />
    </Button>
  );
}
