export class Memory {
  static memory: Int16Array;

  static read(address: i16): i16 {
    return this.memory[address];
  }

  static write(address: i16, value: i16): void {
    this.memory[address] = value;
  }

  static getMemory(): Int16Array {
    return this.memory;
  }

  static initialize(size: i16, program: Int16Array | null = null): void {
    this.memory = new Int16Array(size);

    if (program !== null) {
      const programSize = program.length;

      for (let i = 0; i < programSize; i += 1) {
        this.memory[i] = program[i];
      }
    }
  }
}

export function initializeMemory(
  size: i16,
  program: Int16Array | null = null
): void {
  Memory.initialize(size, program);
}

export function getMemory(): Int16Array {
  return Memory.getMemory();
}
