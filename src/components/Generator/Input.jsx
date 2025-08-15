import { useContext } from 'react';
import InputCalc from '../InputCalc';
import { RootContext } from './Root';
import { useTranslation } from 'react-i18next';

export default function input() {
  const { input, setInput, color } = useContext(RootContext);
  const { t } = useTranslation();

  return (
    <InputCalc
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={t('inputResult')}
      required={false}
      autoFocus={false}
      type={localStorage.getItem('keyType') === 'number' ? 'number' : 'text'}
      inputMode={localStorage.getItem('keyType') === 'number' ? 'decimal' : 'text'}
      color={color}
      step={'any'}
    />
  );
}
