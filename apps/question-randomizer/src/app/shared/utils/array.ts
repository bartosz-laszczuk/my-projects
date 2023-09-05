export const mergeMaps = (map1: Map<any, any>, map2: Map<any, any>) =>
  new Map([...Array.from(map1.entries()), ...Array.from(map2.entries())]);
