export default function Tag({ texto, tipo }) {
  if (tipo == 'pontos') {
    return (
      <span className="p-2 bg-green-500 font-bold text-neutral-200 text-center space-x-6 rounded leading-none">
        <i className="fa-solid fa-check"></i> {texto}
      </span>
    );
  } else if (tipo == 'erros') {
    return (
      <span className="p-2 bg-red-500 font-bold text-neutral-200 text-center rounded leading-none">
        <i className="fa-solid fa-xmark"></i> {texto}
      </span>
    );
  } else if (tipo == 'anterior') {
    return (
      <span className="p-2 bg-blue-500 font-bold text-neutral-200 text-center rounded leading-none">
        <i className="fa-solid fa-arrow-left"></i> {texto}
      </span>
    );
  } else if (tipo == 'time') {
    return (
      <span className="p-2 bg-orange-500 font-bold text-neutral-200 text-center rounded leading-none">
        <i className="fa-solid fa-clock"></i> {texto}
      </span>
    );
  }
}
