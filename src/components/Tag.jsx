import { ArrowLeft, Check, Clock, X } from 'lucide-react';
import React from 'react';

export default function Tag({ text, tipo, color = undefined }) {
  const variant = {
    default:
      'flex flex-row justify-center items-center gap-1 py-2 px-4 font-bold text-neutral-100 text-center space-x-6 rounded-lg leading-none',
  };

  if (tipo === 'pontos') {
    return (
      <span className={`${variant.default} bg-green-600`}>
        <Check className="w-5 h-5" /> {text}
      </span>
    );
  } else if (tipo === 'score') {
    if (color === 'green') {
      return (
        <span className={`${variant.default} bg-green-600`}>
          <Check className="w-5 h-5" /> {text}
        </span>
      );
    }
    if (color === 'red') {
      return (
        <span className={`${variant.default} bg-red-600`}>
          <X className="w-5 h-5" /> {text}
        </span>
      );
    }
    if (color === '') {
      return <span className={`${variant.default} bg-neutral-600`}>{text}</span>;
    }
  } else if (tipo === 'erros') {
    return (
      <span className={`${variant.default} bg-red-600`}>
        <X className="w-5 h-5" /> {text}
      </span>
    );
  } else if (tipo === 'anterior') {
    return (
      <span className={`${variant.default} bg-blue-600`}>
        <ArrowLeft className="w-5 h-5" /> {text}
      </span>
    );
  } else if (tipo === 'time') {
    return (
      <span className={`${variant.default} bg-orange-600`}>
        <Clock className="w-5 h-5" /> {text}
      </span>
    );
  }
}
