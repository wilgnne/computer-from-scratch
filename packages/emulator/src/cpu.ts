import { OpCodes, Registers } from "@computer-from-scratch/common";

import { Memory } from "./memory";

export interface IRegisters {
  A: number;
  B: number;
  C: number;
  D: number;
  IP: number;
  SP: number;
  Zero: boolean;
  Carry: boolean;
  Flag: boolean;
}

export interface Cpu {
  step: () => { registers: IRegisters };
  getRegisters: () => IRegisters;
}

export function createCpu(memory: Memory): Cpu {
  const registers: IRegisters = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    IP: 0,
    SP: 255,
    Zero: false,
    Carry: false,
    Flag: false,
  };

  function readRegister(register: keyof typeof Registers.RegistersMap): number {
    switch (register) {
      case "A":
      case "B":
      case "C":
      case "D":
      case "SP":
        return registers[register];
      case "CD":
        return (registers.C << 8) | registers.D;
      default:
        throw new Error(`Unknown register ${register}`);
    }
  }

  function writeRegister(
    register: keyof typeof Registers.RegistersMap,
    value: number
  ): void {
    switch (register) {
      case "A":
      case "B":
      case "C":
      case "D":
      case "SP":
        registers[register] = value;
        break;
      default:
        throw new Error(`Unknown register ${register}`);
    }
  }

  function readFromIP() {
    const value = memory.read(registers.IP);
    registers.IP += 1;
    return value;
  }

  function push(value: number) {
    registers.SP -= 1;
    memory.write(registers.SP, value);
  }

  function pop() {
    const value = memory.read(registers.SP);
    registers.SP += 1;
    return value;
  }

  function step() {
    const instruction = readFromIP();

    switch (instruction) {
      case OpCodes.CMP_NUMBER_WITH_REG: {
        const register = Registers.RegistersMap[readFromIP()];
        const value = readFromIP();

        registers.Zero = readRegister(register) === value;
        break;
      }
      case OpCodes.INC_REG: {
        const register = Registers.RegistersMap[readFromIP()];
        const result = readRegister(register) + 1;

        if (result === 0) {
          registers.Zero = true;
        } else if (result > 255) {
          registers.Carry = true;
          writeRegister(register, result & 0xff);
          break;
        }
        writeRegister(register, result);
        break;
      }
      case OpCodes.DEC_REG: {
        const register = Registers.RegistersMap[readFromIP()];
        const result = readRegister(register) - 1;

        if (result === 0) {
          registers.Zero = true;
        } else if (result < 0) {
          registers.Carry = true;
          writeRegister(register, result & 0xff);
          break;
        }

        writeRegister(register, result);
        break;
      }
      case OpCodes.JMP_ADDRESS: {
        const address = readFromIP();
        registers.IP = address;
        break;
      }
      case OpCodes.JNZ_ADDRESS: {
        const address = readFromIP();
        if (!registers.Zero) {
          registers.IP = address;
        }
        break;
      }
      case OpCodes.JZ_ADDRESS: {
        const address = readFromIP();
        if (registers.Zero) {
          registers.IP = address;
        }
        break;
      }
      case OpCodes.PUSH_NUMBER: {
        const value = readFromIP();
        push(value);
        break;
      }
      case OpCodes.PUSH_ADDRESS: {
        const address = readFromIP();
        push(memory.read(address));
        break;
      }
      case OpCodes.POP_REG: {
        const reg = readFromIP();
        const register = Registers.RegistersMap[reg];
        writeRegister(register, pop());
        break;
      }
      case OpCodes.MOV_REG_TO_ADDRESS: {
        const address = readFromIP();
        const reg = readFromIP();
        const register = Registers.RegistersMap[reg];
        memory.write(address, readRegister(register));
        break;
      }
      case OpCodes.MOV_REG_TO_REGADDRESS: {
        const to = readFromIP();
        const from = readFromIP();
        const address = readRegister(Registers.RegistersMap[to]);

        memory.write(address, readRegister(Registers.RegistersMap[from]));
        break;
      }
      case OpCodes.MOV_REGADDRESS_TO_REG: {
        const to = readFromIP();
        const from = readFromIP();
        const address = readRegister(Registers.RegistersMap[from]);

        writeRegister(Registers.RegistersMap[to], memory.read(address));
        break;
      }
      case OpCodes.NONE: {
        break;
      }
      default:
        throw new Error(`Unknown instruction: ${instruction.toString(16)}`);
    }

    return {
      registers: { ...registers },
    };
  }

  return {
    step,
    getRegisters: () => ({ ...registers }),
  };
}
