import { Assembler, OpCode, Utils } from "@computer-from-scratch/common";

import { parseRegOrNumber } from "./parse";
import SupportedOperands from "./supportedOperands";

const regex =
  /^[\t ]*(?:([.A-Za-z]\w*)[:])?(?:[\t ]*([A-Za-z]{2,4})(?:[\t ]+(\[(\w+((\+|-)\d+)?)\]|".+?"|'.+?'|[.A-Za-z0-9]\w*)(?:[\t ]*[,][\t ]*(\[(\w+((\+|-)\d+)?)\]|".+?"|'.+?'|[.A-Za-z0-9]\w*))?)?)?/;

const RegexGroup = {
  Label: 1,
  Mnemonic: 2,
  Operand1: 3,
  Operand2: 7,
};

function getValue(input: string): Assembler.Operand {
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

function checkNoExtraArg(instr: string, arg: string) {
  if (arg !== undefined) {
    throw new Error(`${instr}: too many arguments`);
  }
}

function checkSupportedArgs(
  instr: OpCode.Mnemonic,
  arg1: Assembler.OperandType,
  arg2?: Assembler.OperandType
) {
  const p2SupportedOperands = SupportedOperands[instr][arg1];
  if (!p2SupportedOperands)
    throw new Error(`${instr} does not support the first argument ${arg1}`);

  if (arg2 && !p2SupportedOperands.includes(arg2))
    throw new Error(`${instr} does not support the second argument ${arg2}`);
}

export function asm(assembly: string): Assembler.ASM {
  const buffer: (number | string)[] = [];

  const mapping: number[] = [];

  const normalizedLabels: string[] = [];
  const labels: Record<string, number> = {};

  function addLabel(label: string): void {
    const upperLabel = label.toUpperCase();
    if (normalizedLabels.find((l) => l === upperLabel)) {
      throw new Error(`Duplicate label: ${label}`);
    }

    if (
      upperLabel === "A" ||
      upperLabel === "B" ||
      upperLabel === "C" ||
      upperLabel === "D"
    ) {
      throw new Error(`Label contains keyword: ${upperLabel}`);
    }

    labels[label] = buffer.length;
    normalizedLabels.push(upperLabel);
  }

  const lines = assembly.split("\n");
  const expressions = lines.map((line) => regex.exec(line));

  expressions.forEach((expression, index) => {
    if (!expression) {
      return;
    }

    const label = expression[RegexGroup.Label];
    const mnemonic = expression[RegexGroup.Mnemonic];
    const operand1 = expression[RegexGroup.Operand1];
    const operand2 = expression[RegexGroup.Operand2];

    try {
      if (label || mnemonic) {
        if (label) {
          addLabel(label);
        }

        if (mnemonic) {
          const instr = mnemonic.toUpperCase() as OpCode.Mnemonic;
          // Add mapping instr pos to line number
          // Don't do it for DB as this is not a real instruction
          if (instr !== "DB") {
            mapping[buffer.length] = index;
          }

          switch (instr) {
            case "DB": {
              const p1 = getValue(operand1);

              if (p1.type === "number") {
                const value = p1.value as number;
                buffer.push(value);
              } else if (p1.type === "numbers") {
                const value = p1.value as number[];
                value.forEach((num) => buffer.push(num));
              } else {
                throw new Error("DB does not support this operand");
              }
              break;
            }
            case "HLT": {
              checkNoExtraArg(instr, operand1);
              const opcode = OpCode.createOpcode(OpCode.InstructionEnum.HLT);
              buffer.push(opcode);
              break;
            }
            case "PUSH":
            case "POP":
            case "NOT": {
              const p1 = getValue(operand1);
              checkNoExtraArg(instr, operand2);

              checkSupportedArgs(instr, p1.type);

              const opcode = OpCode.createOpcode(
                OpCode.InstructionEnum[instr],
                Utils.operandType2AddressingType(p1.type)
              );

              buffer.push(opcode, p1.value as number);
              break;
            }
            case "MOV":
            case "JMP":
            case "SHL":
            case "SHR":
            case "AND":
            case "OR":
            case "XOR":
            case "ADD":
            case "SUB": {
              const p1 = getValue(operand1);
              const p2 = getValue(operand2);

              checkSupportedArgs(instr, p1.type, p2.type);

              const opcode = OpCode.createOpcode(
                OpCode.InstructionEnum[instr],
                Utils.operandType2AddressingType(p1.type),
                Utils.operandType2AddressingType(p2.type)
              );

              buffer.push(opcode, p1.value as number, p2.value as number);
              break;
            }
            default:
              throw new Error(`Invalid instruction: ${instr}`);
          }
        }
      } else {
        // Check if line starts with a comment
        // otherwise the line contains an error and can not be parsed
        const line = lines[index].trim();
        if (line !== "" && line.slice(0, 1) !== ";") {
          throw new Error(`Syntax error at line ${index + 1} (line: ${line})`);
        }
      }
    } catch (e) {
      throw new Error(`Error at line ${index + 1}: ${e.message}`);
    }
  });

  const code = buffer.map((num) => {
    if (typeof num !== "number") {
      if (num in labels) {
        return labels[num];
      }
      throw new Error(`Label ${num} not found`);
    }
    return num;
  });

  return {
    code,
    labels: Object.keys(labels)
      .map<{ name: string; value: Assembler.Label }>((label) => {
        const pos = labels[label];

        return {
          name: label,
          value: {
            address: pos,
            value: {
              number: code[pos],
              char: String.fromCharCode(code[pos]),
            },
          },
        };
      })
      .reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {}),
  };
}
