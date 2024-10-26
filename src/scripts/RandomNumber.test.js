import { describe, it, expect } from 'vitest';
import { RandomNumber } from './RandomNumber';

describe('RandomNumber', () => {
  it('deve gerar um número entre 1 e maximo para tipo "raiz2"', () => {
    const maximo = 10;
    const result = RandomNumber('raiz2', 'false', maximo);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(maximo);
  });

  it('deve gerar um número negativo se negativo for "true"', () => {
    const maximo = 10;
    const result = RandomNumber('outro', 'true', maximo);

    expect(result).toBeGreaterThanOrEqual(-maximo);
    expect(result).toBeLessThanOrEqual(-1);
  });

  it('deve gerar um número entre 1 e maximo para tipo diferente de "raiz2"', () => {
    const maximo = 10;
    const result = RandomNumber('outro', 'false', maximo);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(maximo);
  });
});
