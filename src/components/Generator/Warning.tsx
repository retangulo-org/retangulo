type Props = {
  text: string;
};

export default function Warning({ text }: Props) {
  return <p className="my-2 p-0 text-center font-sans">{text}</p>;
}
