type RealInstruction =
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

export type Instruction = "DB" | RealInstruction;

const instruction: Record<RealInstruction, number> = {
  HLT: 0b0000,
  MOV: 0b0001,
  PUSH: 0b0010,
  POP: 0b0011,
  JMP: 0b0100,

  SHL: 0b0110,
  SHR: 0b0111,
  NOT: 0b1000,
  AND: 0b1001,
  OR: 0b1010,
  XOR: 0b1011,
  ADD: 0b1100,
  SUB: 0b1101,
};

const addressingTypes = {
  number: 0b00,
  address: 0b01,
  register: 0b10,
  regaddress: 0b11,
};

const OpCodes = {
  HLT:
    (instruction.HLT << 4) |
    (addressingTypes.number << 2) |
    addressingTypes.number,
  MOV_REG_TO_REG:
    (instruction.MOV << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.register,
  MOV_ADDRESS_TO_REG:
    (instruction.MOV << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.address,
  MOV_REGADDRESS_TO_REG:
    (instruction.MOV << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.regaddress,
  MOV_NUMBER_TO_REG:
    (instruction.MOV << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.number,
  MOV_REG_TO_ADDRESS:
    (instruction.MOV << 4) |
    (addressingTypes.address << 2) |
    addressingTypes.register,
  MOV_NUMBER_TO_ADDRESS:
    (instruction.MOV << 4) |
    (addressingTypes.address << 2) |
    addressingTypes.number,
  MOV_REG_TO_REGADDRESS:
    (instruction.MOV << 4) |
    (addressingTypes.regaddress << 2) |
    addressingTypes.register,
  MOV_NUMBER_TO_REGADDRESS:
    (instruction.MOV << 4) |
    (addressingTypes.regaddress << 2) |
    addressingTypes.number,

  PUSH_REG: (instruction.PUSH << 4) | (addressingTypes.register << 2),
  PUSH_REGADDRESS: (instruction.PUSH << 4) | (addressingTypes.regaddress << 2),
  PUSH_ADDRESS: (instruction.PUSH << 4) | (addressingTypes.address << 2),
  PUSH_NUMBER: (instruction.PUSH << 4) | (addressingTypes.number << 2),
  POP_REG: (instruction.POP << 4) | (addressingTypes.register << 2),

  JMP_REGADDRESS_FLAG_NUMBER: 0b0100_00_11,
  JMP_ADDRESS_FLAG_NUMBER: 0b0100_00_01,
  JMP_REGADDRESS_FLAG_ADDRESS: 0b0100_01_11,
  JMP_ADDRESS_FLAG_ADDRESS: 0b0100_01_01,
  JMP_REGADDRESS_FLAG_REG: 0b0100_10_11,
  JMP_ADDRESS_FLAG_REG: 0b0100_10_01,
  JMP_REGADDRESS_FLAG_REGADDRESS: 0b0100_11_11,
  JMP_ADDRESS_FLAG_REGADDRESS: 0b0100_11_01,

  SHL_REG_WITH_REG:
    (instruction.SHL << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.register,
  SHL_REGADDRESS_WITH_REG:
    (instruction.SHL << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.regaddress,
  SHL_ADDRESS_WITH_REG:
    (instruction.SHL << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.address,
  SHL_NUMBER_WITH_REG:
    (instruction.SHL << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.number,
  SHR_REG_WITH_REG:
    (instruction.SHR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.register,
  SHR_REGADDRESS_WITH_REG:
    (instruction.SHR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.regaddress,
  SHR_ADDRESS_WITH_REG:
    (instruction.SHR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.address,
  SHR_NUMBER_WITH_REG:
    (instruction.SHR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.number,

  NOT_REG: (instruction.NOT << 4) | (addressingTypes.register << 2),
  AND_REG_WITH_REG:
    (instruction.AND << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.register,
  AND_REGADDRESS_WITH_REG:
    (instruction.AND << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.regaddress,
  AND_ADDRESS_WITH_REG:
    (instruction.AND << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.address,
  AND_NUMBER_WITH_REG:
    (instruction.AND << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.number,
  OR_REG_WITH_REG:
    (instruction.OR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.register,
  OR_REGADDRESS_WITH_REG:
    (instruction.OR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.regaddress,
  OR_ADDRESS_WITH_REG:
    (instruction.OR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.address,
  OR_NUMBER_WITH_REG:
    (instruction.OR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.number,
  XOR_REG_WITH_REG:
    (instruction.XOR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.register,
  XOR_REGADDRESS_WITH_REG:
    (instruction.XOR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.regaddress,
  XOR_ADDRESS_WITH_REG:
    (instruction.XOR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.address,
  XOR_NUMBER_WITH_REG:
    (instruction.XOR << 4) |
    (addressingTypes.register << 2) |
    addressingTypes.number,

  ADD_NUMBER_TO_REG: 0b1100_10_00,
  ADD_ADDRESS_TO_REG: 0b1100_10_01,
  ADD_REG_TO_REG: 0b1100_10_10,
  ADD_REGADDRESS_TO_REG: 0b1100_10_11,

  SUB_NUMBER_FROM_REG: 0b1101_10_00,
  SUB_ADDRESS_FROM_REG: 0b1101_10_01,
  SUB_REG_FROM_REG: 0b1101_10_10,
  SUB_REGADDRESS_FROM_REG: 0b1101_10_11,
};

export default OpCodes;
