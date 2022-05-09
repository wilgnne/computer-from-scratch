import { OpCode, Registers } from "@computer-from-scratch/common";

import { Memory } from "./memory";

export interface IRegisters {
  A: number;
  B: number;
  C: number;
  D: number;
  IP: number;
  SP: number;
  BP: number;
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
    BP: 255,
    Zero: false,
    Carry: false,
    Flag: false,
  };

  function readRegister(registerCode: number): number {
    const registerName = Registers.decodeRegister(registerCode);

    if (registerName === "CD") {
      return (registers.C << 8) | registers.D;
    }
    if (registerName === "F") {
      return ((registers.Zero ? 1 : 0) << 1) | (registers.Carry ? 1 : 0);
    }

    const value = registers[registerName];

    if (value === undefined) {
      throw new Error(
        `Unknown register ${registerCode}, decoded as ${registerName} on read`
      );
    }

    return value;
  }

  function writeRegister(registerCode: number, value: number): void {
    const registerName = Registers.decodeRegister(registerCode);

    if (!Object.keys(registers).includes(registerName)) {
      throw new Error(
        `Unknown register ${registerCode}, decoded as ${registerName} on write`
      );
    }

    registers[registerName] = value;
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
        const address = readRegister(value);
        return memory.read(address);
      }
      case OpCode.AddressingTypeEnum.REGISTER: {
        return readRegister(value);
      }
      default: {
        throw new Error(
          `Unsupported addressing type ${addressingType} on read ${value}`
        );
      }
    }
  }

  function write(
    target: number,
    addressingType: OpCode.AddressingTypeEnum,
    value: number
  ) {
    const bounded = value & 0xff;

    registers.Carry = value > 0xff;
    registers.Zero = bounded === 0;

    switch (addressingType) {
      case OpCode.AddressingTypeEnum.ADDRESS: {
        const address = target;
        memory.write(address, bounded);
        break;
      }
      case OpCode.AddressingTypeEnum.REGADDRESS: {
        const address = readRegister(target);
        memory.write(address, bounded);
        break;
      }
      case OpCode.AddressingTypeEnum.REGISTER: {
        writeRegister(target, bounded);
        break;
      }
      default: {
        throw new Error(
          `Unsupported addressing type ${addressingType} on write in target: ${target}`
        );
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
        throw new Error("EOF");
      }
      case OpCode.InstructionEnum.MOV: {
        const target = readFromIP();
        const value = read(bAddressingType);

        write(target, aAddressingType, value);
        break;
      }
      case OpCode.InstructionEnum.PUSH: {
        const value = read(aAddressingType);
        push(value);
        break;
      }
      case OpCode.InstructionEnum.POP: {
        const reg = read(aAddressingType);
        writeRegister(reg, pop());
        break;
      }
      case OpCode.InstructionEnum.JMP: {
        const flag = read(aAddressingType);
        if (flag) {
          registers.IP = read(bAddressingType);
        }
        break;
      }
      case OpCode.InstructionEnum.SHL: {
        const reg = readFromIP();
        const shiftCount = read(bAddressingType);
        const value = readRegister(reg);

        const shifted = value << shiftCount;

        write(reg, aAddressingType, shifted);
        break;
      }
      case OpCode.InstructionEnum.SHR: {
        const reg = readFromIP();
        const shiftCount = read(bAddressingType);
        const value = readRegister(reg);

        const shifted = value >> shiftCount;

        write(reg, aAddressingType, shifted);
        break;
      }
      case OpCode.InstructionEnum.NOT: {
        const reg = readFromIP();
        const value = readRegister(reg);

        const inverted = ~value & 0xff;

        write(reg, aAddressingType, inverted);
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
