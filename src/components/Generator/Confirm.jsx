import React from 'react';
import Button from '../Button'

export default function Confirm({onClick, children}) {
  return (
    <Button onClick={onClick}>{children}</Button>
  );
}