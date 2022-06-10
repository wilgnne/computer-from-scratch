import { Assembler, OpCode } from "@computer-from-scratch/common";
import { checkNoExtraArg, checkSupportedArgs, getValue } from "./parse";
import { regex, RegexGroup } from "./regex";

interface PreASM {
  code: string;
  labels: Record<string, Assembler.Label>;
}

export function preprocessor(source: string): PreASM {
  const buffer: string[] = [];
  const normalizedLabels: string[] = [];

  function addLabel(label: string): void {
    const upperLabel = label.toUpperCase();
    if (normalizedLabels.find((l) => l === upperLabel)) {
      throw new Error(`Duplicate label: ${label}`);
    }

    if (
      upperLabel === "A" ||
      upperLabel === "B" ||
      upperLabel === "C" ||
      upperLabel === "F"
    ) {
      throw new Error(`Label contains keyword: ${upperLabel}`);
    }

    normalizedLabels.push(upperLabel);
  }

  const lines = source.split("\n");
  const expressions = lines.map((line) => regex.exec(line));

  expressions.forEach((expression, index) => {
    if (!expression) return;

    const label = expression[RegexGroup.Label];
    const mnemonic = expression[RegexGroup.Mnemonic];
    const operand1 = expression[RegexGroup.Operand1];
    const operand2 = expression[RegexGroup.Operand2];

    try {
      if (label || mnemonic) {
        if (label) {
          addLabel(label);
          buffer.push(`${label}:`);
        }

        if (mnemonic) {
          const instr = mnemonic.toUpperCase() as OpCode.MacroMnemonic;

          switch (instr) {
            case "JZ": {
              const p1 = getValue(operand1);
              checkNoExtraArg(instr, operand2);

              checkSupportedArgs(instr, p1.type);

              buffer.push("    MOV C, F");
              buffer.push("    AND C, 10b");
              buffer.push(`    JMP C, ${p1.value}`);

              break;
            }
            case "JLEZ": {
              const p1 = getValue(operand1);
              checkNoExtraArg(instr, operand2);

              checkSupportedArgs(instr, p1.type);

              buffer.push("    MOV C, F");
              buffer.push("    AND C, 110b");
              buffer.push(`    JMP C, ${p1.value}`);

              break;
            }
            default: {
              buffer.push(
                `    ${instr} ${[operand1, operand2].filter(Boolean).join(",")}`
              );
              break;
            }
          }
        }
      }
    } catch (e) {
      throw new Error(`Error at line ${index + 1}: ${e.message}`);
    }
  });

  return {
    code: buffer.join("\n"),
    labels: normalizedLabels
      .map<{ name: string; value: Assembler.Label }>((label) => ({
        name: label,
        value: {
          address: undefined,
          value: {
            number: undefined,
            char: undefined,
          },
        },
      }))
      .reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {}),
  };
}
