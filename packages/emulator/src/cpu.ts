import { OpCode, Registers } from "@computer-from-scratch/common";

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

  function read(addressingType: OpCode.AddressingTypeEnum) {
    const value = readFromIP();
    switch (addressingType) {
      case OpCode.AddressingTypeEnum.ADDRESS: {
        const address = value;
        return memory.read(address);
      }
      case OpCode.AddressingTypeEnum.NUMBER: {
        return value;
      }
      case OpCode.AddressingTypeEnum.REGADDRESS: {
        const reg = Registers.RegistersMap[value];
        const address = readRegister(reg);
        return memory.read(address);
      }
      case OpCode.AddressingTypeEnum.REGISTER: {
        const reg = Registers.RegistersMap[value];
        return readRegister(reg);
      }
      default: {
        throw new Error("Unsupported addressing type");
      }
    }
  }

  function write(
    target: number,
    addressingType: OpCode.AddressingTypeEnum,
    value: number
  ) {
    switch (addressingType) {
      case OpCode.AddressingTypeEnum.ADDRESS: {
        const address = target;
        memory.write(address, value);
        break;
      }
      case OpCode.AddressingTypeEnum.REGADDRESS: {
        const reg = Registers.RegistersMap[target];
        const address = readRegister(reg);
        memory.write(address, value);
        break;
      }
      case OpCode.AddressingTypeEnum.REGISTER: {
        const reg = Registers.RegistersMap[target];
        writeRegister(reg, value);
        break;
      }
      default: {
        throw new Error("Unsupported addressing type");
      }
    }
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
    const opcode = readFromIP();
    const { instruction, aAddressingType, bAddressingType } =
      OpCode.decodeOpcode(opcode);

    switch (instruction) {
      case OpCode.InstructionEnum.HLT: {
        break;
      }
      case OpCode.InstructionEnum.JMP: {
        const flag = read(aAddressingType);
        if (flag) {
          registers.IP = read(bAddressingType);
        }
        break;
      }
      case OpCode.InstructionEnum.PUSH: {
        const value = read(aAddressingType);
        push(value);
        break;
      }
      case OpCode.InstructionEnum.POP: {
        const reg = read(aAddressingType);
        const register = Registers.RegistersMap[reg];
        writeRegister(register, pop());
        break;
      }
      case OpCode.InstructionEnum.MOV: {
        const target = readFromIP();
        const value = read(bAddressingType);

        write(target, aAddressingType, value);

        const address = readFromIP();
        const reg = readFromIP();
        const register = Registers.RegistersMap[reg];
        memory.write(address, readRegister(register));
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
