import { Assembler, OpCode } from "@computer-from-scratch/common";

const SupportedOperands: Record<
  Exclude<OpCode.Mnemonic, "DB">,
  Partial<Record<Assembler.OperandType, Assembler.OperandType[]>>
> = {
  HLT: {},
  MOV: {
    address: ["number", "register"],
    register: ["number", "address", "register", "regaddress"],
    regaddress: ["number", "register"],
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
