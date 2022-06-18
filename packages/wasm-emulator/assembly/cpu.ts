/* eslint-disable max-classes-per-file */
/* eslint-disable prefer-destructuring */
import * as OpCode from "./opCodes";
import * as Registers from "./registers";

import { Memory } from "./memory";

class RegisterBank {
  static A: i16;

  static B: i16;

  static C: i16;

  static IP: i16;

  static SP: i16;

  static BP: i16;

  static F: i16;

  static initialize(): void {
    this.A = 0;
    this.B = 0;
    this.C = 0;
    this.IP = 0;
    this.SP = 0x2ff;
    this.BP = 0x2ff;
    this.F = 0;
  }

  static getRegisterBank(): i16[] {
    return [this.A, this.B, this.C, this.IP, this.SP, this.BP, this.F];
  }
}

const MAX_REGISTER_VALUE: u16 = 0xffff;

export class CPU {
  private static readRegister(registerCode: i16): i16 {
    const registerName = Registers.decodeRegister(registerCode);

    if (registerName.startsWith("IP")) return RegisterBank.IP;
    if (registerName.startsWith("SP")) return RegisterBank.SP;
    if (registerName.startsWith("BP")) return RegisterBank.BP;
    if (registerName.startsWith("F")) return RegisterBank.F;
    if (registerName.startsWith("A")) return RegisterBank.A;
    if (registerName.startsWith("B")) return RegisterBank.B;
    if (registerName.startsWith("C")) return RegisterBank.C;

    throw new Error(
      `Unknown register ${registerCode}, decoded as ${registerName} on read`
    );
  }

  private static writeRegister(registerCode: i16, value: i16): void {
    const registerName = Registers.decodeRegister(registerCode);

    if (registerName.startsWith("IP")) RegisterBank.IP = value;
    else if (registerName.startsWith("SP")) RegisterBank.SP = value;
    else if (registerName.startsWith("BP")) RegisterBank.BP = value;
    else if (registerName.startsWith("F")) RegisterBank.F = value;
    else if (registerName.startsWith("A")) RegisterBank.A = value;
    else if (registerName.startsWith("B")) RegisterBank.B = value;
    else if (registerName.startsWith("C")) RegisterBank.C = value;
    else
      throw new Error(
        `Unknown register ${registerCode}, decoded as ${registerName} on write`
      );
  }

  private static readFromIP(): i16 {
    const value = Memory.read(RegisterBank.IP);
    RegisterBank.IP += 1;
    return value;
  }

  private static read(
    addressingType: OpCode.AddressingTypeEnum,
    value: i16
  ): i16 {
    switch (addressingType) {
      case OpCode.AddressingTypeEnum.ADDRESS: {
        const address = value;
        return Memory.read(address);
      }
      case OpCode.AddressingTypeEnum.NUMBER: {
        return value;
      }
      case OpCode.AddressingTypeEnum.REGADDRESS: {
        const registerCode = value & 0b111;
        const offset = value >> 3;
        const signedOffset =
          offset >= 0b10000 ? -((~offset & 0b11111) + 1) : offset;
        const address = this.readRegister(registerCode);
        return Memory.read(address + signedOffset);
      }
      case OpCode.AddressingTypeEnum.REGISTER: {
        return this.readRegister(value);
      }
      default: {
        throw new Error(
          `Unsupported addressing type ${addressingType} on read ${value}`
        );
      }
    }
  }

  private static write(
    target: i16,
    addressingType: OpCode.AddressingTypeEnum,
    value: u16
  ): void {
    const bounded: i16 = value & MAX_REGISTER_VALUE;

    const carry: u16 = value > MAX_REGISTER_VALUE ? 1 : 0;
    const zero: u16 = bounded === 0 ? 1 : 0;
    const negative: u16 = bounded & 0x8000 ? 1 : 0;

    const flag: i16 = (negative << 2) | (zero << 1) | carry;

    RegisterBank.F = flag;

    switch (addressingType) {
      case OpCode.AddressingTypeEnum.ADDRESS: {
        const address = target;
        Memory.write(address, bounded);
        break;
      }
      case OpCode.AddressingTypeEnum.REGADDRESS: {
        const registerCode = target & 0b111;
        const offset = target >> 3;
        const signedOffset =
          offset >= 0b10000 ? -((~offset & 0b11111) + 1) : offset;

        const address = this.readRegister(registerCode);
        Memory.write(address + signedOffset, bounded);
        break;
      }
      case OpCode.AddressingTypeEnum.REGISTER: {
        this.writeRegister(target, bounded);
        break;
      }
      default: {
        throw new Error(
          `Unsupported addressing type ${addressingType} on write in target: ${target}`
        );
      }
    }
  }

  private static push(value: i16): void {
    Memory.write(RegisterBank.SP, value);
    RegisterBank.SP -= 1;
  }

  private static pop(): i16 {
    RegisterBank.SP += 1;
    const value = Memory.read(RegisterBank.SP);
    return value;
  }

  public static step(): void {
    const opcode = this.readFromIP();

    const decoded = OpCode.decodeOpcode(opcode);
    const instruction = decoded.instruction;
    const aAddressingType = decoded.aAddressingType;
    const bAddressingType = decoded.bAddressingType;

    switch (instruction) {
      case OpCode.InstructionEnum.HLT: {
        throw new Error("EOF");
      }
      case OpCode.InstructionEnum.MOV: {
        const target = this.readFromIP();
        const value = this.read(bAddressingType, this.readFromIP());

        this.write(target, aAddressingType, value);
        break;
      }
      case OpCode.InstructionEnum.PUSH: {
        const value = this.read(aAddressingType, this.readFromIP());
        this.readFromIP(); // skip the next byte
        this.push(value);
        break;
      }
      case OpCode.InstructionEnum.POP: {
        const reg = this.readFromIP();
        this.readFromIP(); // skip the next byte
        this.writeRegister(reg, this.pop());
        break;
      }
      case OpCode.InstructionEnum.JMP: {
        const flag = this.read(aAddressingType, this.readFromIP());
        const address = this.read(bAddressingType, this.readFromIP());
        if (flag) {
          RegisterBank.IP = address;
        }
        break;
      }
      case OpCode.InstructionEnum.CMP: {
        const target = this.readFromIP();
        const p1 = this.read(aAddressingType, target);
        const p2 = this.read(bAddressingType, this.readFromIP());

        const rawResult: u16 = p1 - p2;

        const bounded: u16 = rawResult & MAX_REGISTER_VALUE;
        const carry: u16 = rawResult > MAX_REGISTER_VALUE ? 1 : 0;
        const zero: u16 = bounded === 0 ? 1 : 0;
        const negative: u16 = bounded & 0x8000 ? 1 : 0;

        const flag: u16 = (negative << 2) | (zero << 1) | carry;

        RegisterBank.F = flag;

        break;
      }
      case OpCode.InstructionEnum.CALL: {
        const address = this.read(aAddressingType, this.readFromIP());
        this.readFromIP(); // skip the next byte

        this.push(RegisterBank.BP);
        this.push(RegisterBank.IP);
        this.writeRegister(Registers.encodeRegister("BP"), RegisterBank.SP);
        RegisterBank.IP = address;

        break;
      }
      case OpCode.InstructionEnum.RET: {
        this.readFromIP(); // skip the next byte
        this.readFromIP(); // skip the next byte
        RegisterBank.IP = this.pop();
        RegisterBank.BP = this.pop();
        break;
      }
      case OpCode.InstructionEnum.SHL: {
        const reg = this.readFromIP();
        const shiftCount = this.read(bAddressingType, this.readFromIP());
        const value = this.readRegister(reg);

        const shifted = value << shiftCount;

        this.write(reg, aAddressingType, shifted);
        break;
      }
      case OpCode.InstructionEnum.SHR: {
        const reg = this.readFromIP();
        const shiftCount = this.read(bAddressingType, this.readFromIP());
        const value = this.readRegister(reg);

        const shifted = value >> shiftCount;

        this.write(reg, aAddressingType, shifted);
        break;
      }
      case OpCode.InstructionEnum.NOT: {
        const reg = this.readFromIP();
        this.readFromIP(); // skip the next byte
        const value = this.readRegister(reg);

        const inverted = ~value & MAX_REGISTER_VALUE;

        this.write(reg, aAddressingType, inverted);
        break;
      }
      case OpCode.InstructionEnum.AND: {
        const target = this.readFromIP();
        const p1 = this.read(aAddressingType, target);
        const p2 = this.read(bAddressingType, this.readFromIP());

        const rawResult = p1 & p2;

        this.write(target, aAddressingType, rawResult);
        break;
      }
      case OpCode.InstructionEnum.OR: {
        const target = this.readFromIP();
        const p1 = this.read(aAddressingType, target);
        const p2 = this.read(bAddressingType, this.readFromIP());

        const rawResult = p1 | p2;

        this.write(target, aAddressingType, rawResult);
        break;
      }
      case OpCode.InstructionEnum.XOR: {
        const target = this.readFromIP();
        const p1 = this.read(aAddressingType, target);
        const p2 = this.read(bAddressingType, this.readFromIP());

        const rawResult = p1 ^ p2;

        this.write(target, aAddressingType, rawResult);
        break;
      }
      case OpCode.InstructionEnum.ADD: {
        const target = this.readFromIP();
        const p1 = this.read(aAddressingType, target);
        const p2 = this.read(bAddressingType, this.readFromIP());

        const rawResult = p1 + p2;

        this.write(target, aAddressingType, rawResult);
        break;
      }
      case OpCode.InstructionEnum.SUB: {
        const target = this.readFromIP();
        const p1 = this.read(aAddressingType, target);
        const p2 = this.read(bAddressingType, this.readFromIP());

        const rawResult = p1 - p2;

        this.write(target, aAddressingType, rawResult);
        break;
      }
      default:
        throw new Error(
          `Unknown instruction: ${(instruction as number).toString(16)}`
        );
    }
  }
}

export function initializeCPU(): void {
  RegisterBank.initialize();
}

export function stepCPU(): void {
  return CPU.step();
}

export function getRegisterBank(): i16[] {
  return RegisterBank.getRegisterBank();
}
