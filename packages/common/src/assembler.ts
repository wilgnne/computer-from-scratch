// MATCHES: "(+|-)INTEGER"
export const regexNum = /^[-+]?[0-9]+$/;
// MATCHES: "(.L)abel"
export const regexLabel = /^[.A-Za-z]\w*$/;

export type OperandType =
  | "number"
  | "numbers"
  | "regaddress"
  | "register"
  | "address";

export interface Operand {
  type: OperandType;
  value: number | number[] | string;
}

export interface Label {
  address: number;
  value: {
    number: number;
    char: string;
  };
}

export interface ASM {
  code: number[];
  labels: Record<string, Label>;
}
