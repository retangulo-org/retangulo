import React from 'react';

export default function Card({ title, text }) {
  return (
    <section className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}
