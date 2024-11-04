export default function Tag({ text, tipo, color }) {
  if (tipo === 'pontos') {
    return (
      <span className="p-2 bg-green-600 font-bold text-neutral-200 text-center space-x-6 rounded leading-none">
        <i className="fa-solid fa-check"></i> {text}
      </span>
    );
  } else if (tipo === 'score') {
    if (color === 'green') {
      return (
        <span className="p-2 bg-green-600 font-bold text-neutral-200 text-center space-x-6 rounded leading-none">
          <i className="fa-solid fa-arrow-up"></i> {text}
        </span>
      );
    }
    if (color === 'red') {
      return (
        <span className="p-2 bg-red-600 font-bold text-neutral-200 text-center space-x-6 rounded leading-none">
          <i className="fa-solid fa-arrow-down"></i> {text}
        </span>
      );
    }
    if (color === '') {
      return (
        <span className="p-2 bg-neutral-600 font-bold text-neutral-200 text-center space-x-6 rounded leading-none">
          {text}
        </span>
      );
    }
  } else if (tipo === 'erros') {
    return (
      <span className="p-2 bg-red-600 font-bold text-neutral-200 text-center rounded leading-none">
        <i className="fa-solid fa-xmark"></i> {text}
      </span>
    );
  } else if (tipo === 'anterior') {
    return (
      <span className="p-2 bg-blue-600 font-bold text-neutral-200 text-center rounded leading-none">
        <i className="fa-solid fa-arrow-left"></i> {text}
      </span>
    );
  } else if (tipo === 'time') {
    return (
      <span className="p-2 bg-orange-600 font-bold text-neutral-200 text-center rounded leading-none">
        <i className="fa-solid fa-clock"></i> {text}
      </span>
    );
  }
}
