import { ArrowLeft, Check, Clock, X } from 'lucide-react';
import React from 'react';

export default function Tag({ text, type, color = undefined }) {
  const variant = {
    default:
      'flex flex-row justify-center items-center gap-1 py-2 px-4 font-bold text-center space-x-6 rounded-lg leading-none',
  };

  if (type === 'pontos') {
    return (
      <span className={`${variant.default} success`}>
        <Check className="w-5 h-5" /> {text}
      </span>
    );
  } 

  if (type === 'score') {
    if (color === 'green') {
      return (
        <span className={`${variant.default} success`}>
          <Check className="w-5 h-5" /> {text}
        </span>
      );
    }
    if (color === 'red') {
      return (
        <span className={`${variant.default} danger`}>
          <X className="w-5 h-5" /> {text}
        </span>
      );
    }
    if (color === '') {
      return <span className={`${variant.default} bg-neutral-600 text-neutral-100`}>{text}</span>;
    }
  };

  if (type === 'erros') {
    return (
      <span className={`${variant.default} danger`}>
        <X className="w-5 h-5" /> {text}
      </span>
    );
  } else if (type === 'anterior') {
    return (
      <span className={`${variant.default} primary`}>
        <ArrowLeft className="w-5 h-5" /> {text}
      </span>
    );
  } else if (type === 'time') {
    return (
      <span className={`${variant.default} warning`}>
        <Clock className="w-5 h-5" /> {text}s
      </span>
    );
  }
}
