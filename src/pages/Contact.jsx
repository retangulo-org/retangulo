import Button from '../components/Button';
import Input from '../components/Input';

export const Contact = () => {
  return (
    <>
      <h4>Nome</h4>
      <Input type="text" />
      <h4>E-mail</h4>
      <Input type="email" />
      <h4>Mensagem</h4>
      <textarea></textarea>
      <Button text="Enviar" />
    </>
  );
};
