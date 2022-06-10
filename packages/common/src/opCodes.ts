export type MacroMnemonic = "JZ" | "JLEZ";

export type Mnemonic =
  | "DB"
  | "HLT"
  | "MOV"
  | "PUSH"
  | "PUSH"
  | "POP"
  | "JMP"
  | "CMP"
  | "CALL"
  | "RET"
  | "SHL"
  | "SHR"
  | "NOT"
  | "AND"
  | "OR"
  | "XOR"
  | "ADD"
  | "SUB";

export enum InstructionEnum {
  HLT = 0x0,
  MOV = 0x1,
  PUSH = 0x2,
  POP = 0x3,
  JMP = 0x4,
  CMP = 0x5,
  CALL = 0x6,
  RET = 0x7,
  SHL = 0x8,
  SHR = 0x9,
  NOT = 0xa,
  AND = 0xb,
  OR = 0xc,
  XOR = 0xd,
  ADD = 0xe,
  SUB = 0xf,
}

export enum AddressingTypeEnum {
  NUMBER = 0b00,
  ADDRESS = 0b01,
  REGISTER = 0b10,
  REGADDRESS = 0b11,
}

export function createOpcode(
  instruction: InstructionEnum,
  aAddressingType?: AddressingTypeEnum,
  bAddressingType?: AddressingTypeEnum
) {
  return (instruction << 4) | (aAddressingType << 2) | bAddressingType;
}

export function decodeOpcode(opcode: number): {
  instruction: InstructionEnum;
  aAddressingType: AddressingTypeEnum;
  bAddressingType: AddressingTypeEnum;
} {
  return {
    instruction: opcode >> 4,
    aAddressingType: (opcode >> 2) & 0b11,
    bAddressingType: opcode & 0b11,
  };
}
