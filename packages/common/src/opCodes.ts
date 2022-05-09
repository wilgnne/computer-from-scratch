export type MacroMnemonic = "CALL" | "RET";

export type Mnemonic =
  | "DB"
  | "HLT"
  | "MOV"
  | "PUSH"
  | "PUSH"
  | "POP"
  | "JMP"
  | "SHL"
  | "SHR"
  | "NOT"
  | "AND"
  | "OR"
  | "XOR"
  | "ADD"
  | "SUB";

export enum InstructionEnum {
  HLT = 0b0000,
  MOV = 0b0001,
  PUSH = 0b0010,
  POP = 0b0011,
  JMP = 0b0100,

  SHL = 0b0110,
  SHR = 0b0111,
  NOT = 0b1000,
  AND = 0b1001,
  OR = 0b1010,
  XOR = 0b1011,
  ADD = 0b1100,
  SUB = 0b1101,
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
