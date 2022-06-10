import { Assembler, Registers, OpCode } from "@computer-from-scratch/common";
import SupportedOperands from "./supportedOperands";

/**
 * @description
 * Parses a label.
 * Allowed formats: .Llabel, label
 */
export function parseLabel(input: string): string | undefined {
  return Assembler.regexLabel.exec(input) ? input : undefined;
}

/**
 * @description
 * Parses a number.
 * Allowed formats: 200, 200d, 0xA4, 0o48, 101b
 */
export function parseNumber(input: string): number {
  if (input.slice(0, 2) === "0x") {
    return parseInt(input.slice(2), 16);
  }
  if (input.slice(0, 2) === "0o") {
    return parseInt(input.slice(2), 8);
  }
  if (input.slice(input.length - 1) === "b") {
    return parseInt(input.slice(0, input.length - 1), 2);
  }
  if (input.slice(input.length - 1) === "d") {
    return parseInt(input.slice(0, input.length - 1), 10);
  }
  if (Assembler.regexNum.exec(input)) {
    return parseInt(input, 10);
  }
  throw Error("Invalid number format");
}

/**
 * @description
 * Parses a register.
 * Allowed 8 bits register formats: A, B, C, D
 * Allowed 16 bits register formats: IP, SP, CD
 */
export function parseRegister(input: string): number {
  const reg = input.toUpperCase();

  return Registers.encodeRegister(reg);
}

export function parseOffsetAddressing(input: string): number | undefined {
  const inputUpper = input.toUpperCase();
  let m = 0;
  let base = 0;

  if (inputUpper.slice(0, 2) === "SP") {
    base = 4;
  } else if (inputUpper.slice(0, 2) === "BP") {
    base = 5;
  } else if (inputUpper[0] === "A") {
    base = 0;
  } else if (inputUpper[0] === "B") {
    base = 1;
  } else if (inputUpper[0] === "C") {
    base = 2;
  } else if (inputUpper[0] === "D") {
    base = 3;
  } else {
    return undefined;
  }

  let offsetStart = 1;
  if (base >= 4) {
    offsetStart = 2;
  }

  if (inputUpper[offsetStart] === "-") {
    m = -1;
  } else if (inputUpper[offsetStart] === "+") {
    m = 1;
  } else {
    return undefined;
  }

  let offset = m * parseInt(inputUpper.slice(offsetStart + 1), 10);

  if (offset < -16 || offset > 15) {
    throw new Error("offset must be a value between -16...+15");
  }

  if (offset < 0) {
    offset = 32 + offset; // two's complement representation in 5-bit
  }

  return offset * 8 + base; // shift offset 3 bits right and add code for register
}

// Allowed: Register, Label or Number; SP+/-Number is allowed for 'regaddress' type
export function parseRegOrNumber(
  input: string,
  typeReg: Assembler.OperandType,
  typeNumber: Assembler.OperandType
): Assembler.Operand {
  let register = parseRegister(input);

  if (register !== undefined) {
    return { type: typeReg, value: register };
  }
  const label = parseLabel(input);
  if (label) {
    return { type: typeNumber, value: label };
  }
  if (typeReg === "regaddress") {
    register = parseOffsetAddressing(input);

    if (register !== undefined) {
      return { type: typeReg, value: register };
    }
  }

  const value = parseNumber(input);

  if (Number.isNaN(value)) {
    throw new Error(`Not a ${typeNumber}: ${value}`);
  } else if (value < 0 || value > 0xffff) {
    throw new Error(`${typeNumber} must have a value between 0x0-0xffff`);
  }

  return { type: typeNumber, value };
}

export function getValue(input: string): Assembler.Operand {
  switch (input.slice(0, 1)) {
    case "[": {
      const address = input.slice(1, input.length - 1);
      return parseRegOrNumber(address, "regaddress", "address");
    } // [number] or [register]
    case '"': {
      const text = input.slice(1, input.length - 1);
      const chars = text.split("").map((char) => char.charCodeAt(0));

      return { type: "numbers", value: chars };
    } // "String"
    case "'": {
      const character = input.slice(1, input.length - 1);
      if (character.length > 1) {
        throw Error("Only one character is allowed. Use String instead");
      }

      return { type: "number", value: character.charCodeAt(0) };
    } // 'C'
    default: // REGISTER, NUMBER or LABEL
      return parseRegOrNumber(input, "register", "number");
  }
}

export function checkNoExtraArg(instr: string, arg: string) {
  if (arg !== undefined) {
    throw new Error(`${instr}: too many arguments`);
  }
}

export function checkSupportedArgs(
  instr: OpCode.Mnemonic | OpCode.MacroMnemonic,
  arg1: Assembler.OperandType,
  arg2?: Assembler.OperandType
) {
  const p2SupportedOperands = SupportedOperands[instr][arg1];
  if (!p2SupportedOperands)
    throw new Error(`${instr} does not support the first argument ${arg1}`);

  if (arg2 && !p2SupportedOperands.includes(arg2))
    throw new Error(`${instr} does not support the second argument ${arg2}`);
}
