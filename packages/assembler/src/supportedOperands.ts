import { Assembler, OpCode } from "@computer-from-scratch/common";

const SupportedOperands: Record<
  Exclude<OpCode.Mnemonic | OpCode.MacroMnemonic, "DB">,
  Partial<Record<Assembler.OperandType, Assembler.OperandType[]>>
> = {
  CALL: {
    number: [],
  },
  RET: {},
  HLT: {},
  MOV: {
    address: ["number", "address", "register", "regaddress"],
    register: ["number", "address", "register", "regaddress"],
    regaddress: ["number", "address", "register", "regaddress"],
  },
  PUSH: {
    register: [],
    regaddress: [],
    address: [],
    number: [],
  },
  POP: {
    register: [],
  },
  JMP: {
    register: ["number", "address", "register", "regaddress"],
    regaddress: ["number", "address", "register", "regaddress"],
    number: ["number", "address", "register", "regaddress"],
  },
  JZ: {
    register: ["number", "address", "register", "regaddress"],
    regaddress: ["number", "address", "register", "regaddress"],
    number: ["number", "address", "register", "regaddress"],
  },
  JLEZ: {
    register: ["number", "address", "register", "regaddress"],
    regaddress: ["number", "address", "register", "regaddress"],
    number: ["number", "address", "register", "regaddress"],
  },
  CMP: {
    register: ["register", "address", "number"],
  },
  SHL: {
    register: ["register", "address", "number"],
  },
  SHR: {
    register: ["register", "address", "number"],
  },
  NOT: {
    register: [],
  },
  AND: {
    register: ["register", "address", "number"],
  },
  OR: {
    register: ["register", "address", "number"],
  },
  XOR: {
    register: ["register", "address", "number"],
  },
  ADD: {
    register: ["register", "address", "number"],
  },
  SUB: {
    register: ["register", "address", "number"],
  },
};

export default SupportedOperands;
