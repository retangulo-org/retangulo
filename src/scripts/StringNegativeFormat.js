const StringNegativeFormat = (number) => {
  if (number <= 0) {
    return `(${number})`;
  }

  return `${number}`;
};

export { StringNegativeFormat };
