export function chunkArray<T>(myArray: T[], chunkSize: number) {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray: T[][] = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    const myChunk = myArray.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
}
