import { expect, test } from 'vitest';
import { StringNegativeFormat } from './StringNegativeFormat';

test('Deve retorna "(String)" se receber um número negativo', () => {
  expect(StringNegativeFormat(-1)).toBe('(-1)');
});

test('Deve retorna "String" se receber um número positivo', () => {
  expect(StringNegativeFormat(1)).toBe('1');
});
