import React from 'react';

export default function Content({ children, className }) {
  return <div className={`${className} flex flex-col mb-6`}>{children}</div>;
}
