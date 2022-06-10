import { Assembler, OpCode, Utils } from "@computer-from-scratch/common";
import { checkNoExtraArg, checkSupportedArgs, getValue } from "./parse";

import { regex, RegexGroup } from "./regex";

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
            case "HLT":
            case "RET": {
              checkNoExtraArg(instr, operand1);
              const opcode = OpCode.createOpcode(OpCode.InstructionEnum[instr]);
              buffer.push(opcode, 0, 0);
              break;
            }
            case "PUSH":
            case "POP":
            case "CALL":
            case "NOT": {
              const p1 = getValue(operand1);
              checkNoExtraArg(instr, operand2);

              checkSupportedArgs(instr, p1.type);

              const opcode = OpCode.createOpcode(
                OpCode.InstructionEnum[instr],
                Utils.operandType2AddressingType(p1.type)
              );

              buffer.push(opcode, p1.value as number, 0);
              break;
            }
            case "MOV":
            case "JMP":
            case "CMP":
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
