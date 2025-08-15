import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';

export default function Confirm() {
  const { t } = useTranslation();

  return <Button type="submit">{t('bConfirm')}</Button>;
}
