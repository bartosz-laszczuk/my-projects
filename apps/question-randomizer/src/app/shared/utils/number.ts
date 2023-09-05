export const isWhatPercentOf = (numA: number, numB: number) => {
  return (numA / numB) * 100;
};

export const getPercentageIncrease = (numA: number, numB: number) => {
  return ((numA - numB) / numB) * 100;
};
