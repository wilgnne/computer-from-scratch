import { Assembler, OpCodes, Instruction } from "@computer-from-scratch/common";

import { parseRegOrNumber } from "./parse";

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
          const instr = mnemonic.toUpperCase() as Instruction;
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
              buffer.push(OpCodes.HLT);
              break;
            }
            case "MOV": {
              const p1 = getValue(operand1);
              const p2 = getValue(operand2);

              const opCodeMap = {
                address: {
                  number: OpCodes.MOV_NUMBER_TO_ADDRESS,
                  register: OpCodes.MOV_REG_TO_ADDRESS,
                },
                register: {
                  number: OpCodes.MOV_NUMBER_TO_REG,
                  address: OpCodes.MOV_ADDRESS_TO_REG,
                  register: OpCodes.MOV_REG_TO_REG,
                  regaddress: OpCodes.MOV_REGADDRESS_TO_REG,
                },
                regaddress: {
                  number: OpCodes.MOV_NUMBER_TO_REGADDRESS,
                  register: OpCodes.MOV_REG_TO_REGADDRESS,
                },
              };

              const MOV_TYPE = opCodeMap[p1.type];
              if (!MOV_TYPE)
                throw new Error("MOV does not support this operands");

              const opCode = MOV_TYPE[p2.type];
              if (!opCode)
                throw new Error("MOV does not support this operands");

              buffer.push(opCode, p1.value as number, p2.value as number);
              break;
            }
            case "PUSH": {
              let opCode;
              const p1 = getValue(operand1);
              checkNoExtraArg(instr, operand2);

              if (p1.type === "register") {
                opCode = OpCodes.PUSH_REG;
              } else if (p1.type === "regaddress") {
                opCode = OpCodes.PUSH_REGADDRESS;
              } else if (p1.type === "address") {
                opCode = OpCodes.PUSH_ADDRESS;
              } else if (p1.type === "number") {
                opCode = OpCodes.PUSH_NUMBER;
              } else {
                throw new Error("PUSH does not support this operand");
              }

              buffer.push(opCode, p1.value as number);
              break;
            }
            case "POP": {
              let opCode;
              const p1 = getValue(operand1);
              checkNoExtraArg(instr, operand2);

              if (p1.type === "register") {
                opCode = OpCodes.POP_REG;
              } else {
                throw new Error("POP does not support this operand");
              }

              buffer.push(opCode, p1.value as number);
              break;
            }
            case "JMP": {
              const p1 = getValue(operand1);
              const p2 = getValue(operand1);

              const opCodeMap = {
                number: {
                  address: OpCodes.JMP_ADDRESS_FLAG_ADDRESS,
                  regaddress: OpCodes.JMP_REGADDRESS_FLAG_REGADDRESS,
                },
                address: {
                  address: OpCodes.JMP_ADDRESS_FLAG_ADDRESS,
                  regaddress: OpCodes.JMP_REGADDRESS_FLAG_ADDRESS,
                },
                register: {
                  address: OpCodes.JMP_ADDRESS_FLAG_REG,
                  regaddress: OpCodes.JMP_REGADDRESS_FLAG_REG,
                },
                regaddress: {
                  address: OpCodes.JMP_ADDRESS_FLAG_REGADDRESS,
                  regaddress: OpCodes.JMP_REGADDRESS_FLAG_REGADDRESS,
                },
              };

              const JMP_TYPES = opCodeMap[p1.type];
              if (!JMP_TYPES) {
                throw new Error(
                  `JMP does not support this operand ${p1.type} as flag`
                );
              }

              const opCode = JMP_TYPES[p2.type];
              if (!opCode) {
                throw new Error(
                  `JMP does not support this operand ${p2.type} as destination`
                );
              }

              buffer.push(opCode, p1.value as number);
              break;
            }
            case "ADD": {
              const p1 = getValue(operand1);
              const p2 = getValue(operand2);

              if (p1.type !== "register")
                throw new Error("ADD does not support this operands");

              const ADD_TYPE = {
                number: OpCodes.ADD_NUMBER_TO_REG,
                address: OpCodes.ADD_ADDRESS_TO_REG,
                register: OpCodes.ADD_REG_TO_REG,
                regaddress: OpCodes.ADD_REGADDRESS_TO_REG,
              };

              const opCode = ADD_TYPE[p2.type];
              if (!opCode)
                throw new Error("ADD does not support this operands");

              buffer.push(opCode, p1.value as number, p2.value as number);
              break;
            }
            case "SUB": {
              const p1 = getValue(operand1);
              const p2 = getValue(operand2);

              if (p1.type !== "register")
                throw new Error("SUB does not support this operands");

              const SUB_TYPE = {
                number: OpCodes.SUB_NUMBER_FROM_REG,
                address: OpCodes.SUB_ADDRESS_FROM_REG,
                register: OpCodes.SUB_REG_FROM_REG,
                regaddress: OpCodes.SUB_REGADDRESS_FROM_REG,
              };

              const opCode = SUB_TYPE[p2.type];
              if (!opCode)
                throw new Error("SUB does not support this operands");

              buffer.push(opCode, p1.value as number, p2.value as number);
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
