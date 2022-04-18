export interface Memory {
  read(_address: number): number;
  write(_address: number, _value: number): void;
  getMemory(): number[];
}

export function createMemory(size: number, program?: number[]): Memory {
  const memory = new Array(size).fill(0);

  if (program) {
    const programSize = program.length;

    for (let i = 0; i < programSize; i += 1) {
      memory[i] = program[i];
    }
  }

  return {
    read: (address: number) => memory[address],
    write: (address: number, value: number) => {
      memory[address] = value;
    },
    getMemory: () => [...memory],
  };
}
