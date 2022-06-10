import { OpCode, Registers } from "@computer-from-scratch/common";
import { encodeRegister } from "@computer-from-scratch/common/dist/registers";

import { Memory } from "./memory";

export interface IRegisters {
  A: number;
  B: number;
  C: number;
  IP: number;
  SP: number;
  BP: number;
  F: number;
}

const MAX_REGISTER_VALUE = 0xffff;

export interface Cpu {
  step: () => { registers: IRegisters };
  getRegisters: () => IRegisters;
}

export function createCpu(memory: Memory): Cpu {
  const registers: IRegisters = {
    A: 0,
    B: 0,
    C: 0,
    IP: 0,
    SP: 0x3ff,
    BP: 0x3ff,
    F: 0,
  };

  function readRegister(registerCode: number): number {
    const registerName = Registers.decodeRegister(registerCode);

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

  function read(addressingType: OpCode.AddressingTypeEnum, v?: number) {
    const value = v === undefined ? readFromIP() : v;

    switch (addressingType) {
      case OpCode.AddressingTypeEnum.ADDRESS: {
        const address = value;
        return memory.read(address);
      }
      case OpCode.AddressingTypeEnum.NUMBER: {
        return value;
      }
      case OpCode.AddressingTypeEnum.REGADDRESS: {
        const registerCode = value & 0b111;
        const offset = value >> 3;
        const signedOffset =
          offset >= 0b10000 ? -((~offset & 0b11111) + 1) : offset;
        const address = readRegister(registerCode);
        return memory.read(address + signedOffset);
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
    const bounded = value & MAX_REGISTER_VALUE;

    const carry = value > MAX_REGISTER_VALUE ? 1 : 0;
    const zero = bounded === 0 ? 1 : 0;
    const negative = bounded & 0x8000 ? 1 : 0;

    registers.F = (negative << 2) | (zero << 1) | carry;

    switch (addressingType) {
      case OpCode.AddressingTypeEnum.ADDRESS: {
        const address = target;
        memory.write(address, bounded);
        break;
      }
      case OpCode.AddressingTypeEnum.REGADDRESS: {
        const registerCode = target & 0b111;
        const offset = target >> 3;
        const signedOffset =
          offset >= 0b10000 ? -((~offset & 0b11111) + 1) : offset;

        const address = readRegister(registerCode);
        memory.write(address + signedOffset, bounded);
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
    memory.write(registers.SP, value);
    registers.SP -= 1;
  }

  function pop() {
    registers.SP += 1;
    const value = memory.read(registers.SP);
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
        readFromIP(); // skip the next byte
        push(value);
        break;
      }
      case OpCode.InstructionEnum.POP: {
        const reg = readFromIP();
        readFromIP(); // skip the next byte
        writeRegister(reg, pop());
        break;
      }
      case OpCode.InstructionEnum.JMP: {
        const flag = read(aAddressingType);
        const address = read(bAddressingType);
        if (flag) {
          registers.IP = address;
        }
        break;
      }
      case OpCode.InstructionEnum.CMP: {
        const target = readFromIP();
        const p1 = read(aAddressingType, target);
        const p2 = read(bAddressingType);

        const rawResult = p1 - p2;

        const bounded = rawResult & MAX_REGISTER_VALUE;
        const carry = rawResult > MAX_REGISTER_VALUE ? 1 : 0;
        const zero = bounded === 0 ? 1 : 0;
        const negative = bounded & 0x8000 ? 1 : 0;

        registers.F = (negative << 2) | (zero << 1) | carry;

        break;
      }
      case OpCode.InstructionEnum.CALL: {
        const address = read(aAddressingType);
        readFromIP(); // skip the next byte

        push(registers.BP);
        push(registers.IP);
        writeRegister(encodeRegister("BP"), registers.SP);
        registers.IP = address;

        break;
      }
      case OpCode.InstructionEnum.RET: {
        readFromIP(); // skip the next byte
        readFromIP(); // skip the next byte
        registers.IP = pop();
        registers.BP = pop();
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
        readFromIP(); // skip the next byte
        const value = readRegister(reg);

        const inverted = ~value & MAX_REGISTER_VALUE;

        write(reg, aAddressingType, inverted);
        break;
      }
      case OpCode.InstructionEnum.AND: {
        const target = readFromIP();
        const p1 = read(aAddressingType, target);
        const p2 = read(bAddressingType);

        const rawResult = p1 & p2;

        write(target, aAddressingType, rawResult);
        break;
      }
      case OpCode.InstructionEnum.OR: {
        const target = readFromIP();
        const p1 = read(aAddressingType, target);
        const p2 = read(bAddressingType);

        const rawResult = p1 | p2;

        write(target, aAddressingType, rawResult);
        break;
      }
      case OpCode.InstructionEnum.XOR: {
        const target = readFromIP();
        const p1 = read(aAddressingType, target);
        const p2 = read(bAddressingType);

        const rawResult = p1 ^ p2;

        write(target, aAddressingType, rawResult);
        break;
      }
      case OpCode.InstructionEnum.ADD: {
        const target = readFromIP();
        const p1 = read(aAddressingType, target);
        const p2 = read(bAddressingType);

        const rawResult = p1 + p2;

        write(target, aAddressingType, rawResult);
        break;
      }
      case OpCode.InstructionEnum.SUB: {
        const target = readFromIP();
        const p1 = read(aAddressingType, target);
        const p2 = read(bAddressingType);

        const rawResult = p1 - p2;

        write(target, aAddressingType, rawResult);
        break;
      }
      default:
        throw new Error(
          `Unknown instruction: ${(instruction as number).toString(16)}`
        );
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
